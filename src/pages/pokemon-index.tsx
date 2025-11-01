import { useState, useEffect } from "react";
import Pokemon from "../components/pokemon";

interface PokeHeader {
  name: string;
  url: string;
}

function PokemonIndex() {
  const defaultUrl = "/pokeapi/pokemon"
  const [pokedex, setPokedex] = useState<PokeHeader[]>([])
  const [prevUrl, setPrevUrl] = useState<string | null>(null)
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const parseUrl = (url: string | null) => {
    if (!url) return null;
    return url.replace("https://pokeapi.co/api/v2/","/pokeapi/")
  }

  const determinePages = (urlObj: URL, count: number, next = false) => {
    const params = urlObj.searchParams;
    const offset = parseInt(params.get("offset") || "1");
    const limit = parseInt(params.get("limit") || "1");
    const totalPages = Math.ceil(count / limit) 
    setTotalPages(totalPages);
    setCurrentPage(next ? (offset / limit): totalPages);
  }

  const fetchPokemon = async (url: string) => {
    const response = await fetch(url);
    const json = await response.json();
    determinePages(new URL(json.next || json.previous), json.count, json.next)
    setPokedex(json.results)
    setPrevUrl(parseUrl(json.previous));
    setNextUrl(parseUrl(json.next));
  }

  const getPreviousPage = () => {
    if (prevUrl) fetchPokemon(prevUrl);
  }

  const getNextPage = () => {
    if (nextUrl) fetchPokemon(nextUrl);
  }

  useEffect(() => {
    fetchPokemon(defaultUrl) 
  },[])

  return <div id="pokemon-page">
    <ul id="pokemon-list">
      {pokedex.map((pokemon) => {
        return (<li key={pokemon.url}>
          <Pokemon name={pokemon.name} url={pokemon.url} startOpened={false}/>
        </li>)
      }
      )}
    </ul>
    <nav className="page-selector" id="pokemon-nav">
      {prevUrl ? <button onClick={getPreviousPage}>previous</button> : <div></div> }
      <p>Page {currentPage} of {totalPages} </p>
      {nextUrl ? <button onClick={getNextPage}>next</button> : <div></div> }
    </nav>
  </div>
}

export default PokemonIndex;
