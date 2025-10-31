import { useState, type FC } from "react";
import ItemsIndex from "./items-index";
import ThingsIndex from "./things-index";
import PokemonIndex from "./pokemon-index";

interface PagesList {
  [index: string]: React.ReactNode 
}

function HomePage() {

  const [pageKey, setPageKey] = useState<string>(() => "Items")

  const pages: PagesList = {
    Items: ItemsIndex(),
    Things: ThingsIndex(),
    Pokemon: PokemonIndex() 
  };
  const makeChoosePage = (key: string) => {
    return () => {
      setPageKey(key)
    }
  }
  return (
    <div>
      <ul>
        {
          Object.keys(pages).map((key) => (
            <li onClick={makeChoosePage(key)}>
              {key}
            </li>
            ))
        }
      </ul>
      <div>
        {pages[pageKey]}
      </div>
    </div>
  );
}

export default HomePage;
