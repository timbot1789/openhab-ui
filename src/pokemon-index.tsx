import { useState, useEffect } from "react";
function PokemonIndex() {
  const [pokemon, setPokemon] = useState([])

  const fetchPokemon = async () => {
    const response = await fetch("/pokeapi/pokemon");
    const json = (await response.json()).results
    setPokemon(json)
  }

  useEffect(() => {
    fetchPokemon() 
  },[])

  return <ul>
    {pokemon.map((poke) => <li>
      <a href={poke.url}>{poke.name}</a>
    </li>)}
  </ul>
}

export default PokemonIndex;
