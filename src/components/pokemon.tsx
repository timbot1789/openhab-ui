import { useState } from "react";

interface Props { name: string, url: string, startOpened: boolean }
interface Sprite {
  front_default: string
}
interface Pokemon {
  sprites: Sprite, 
}
interface Pokemon {
  image: HTMLImageElement
}

function Pokemon({name, url, startOpened}: Props) {
  const [open, setOpen] = useState<boolean>(startOpened)
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const catchPokemon = async () => {
    if (pokemon) return;
    const response = await fetch(url);
    const json: Pokemon = await response.json();
    const img = new Image();
    img.src = json.sprites.front_default
    setPokemon(json);
  }

  const toggleOpen = () => {
    setOpen(!open);
    catchPokemon();
  }

  return <section onClick={toggleOpen} onMouseEnter={catchPokemon}>
    <a>{name}</a>
    {
      open && pokemon && <article>
        <img src={pokemon.sprites.front_default}/>
      </article>
    }
  </section>
}

export default Pokemon;
