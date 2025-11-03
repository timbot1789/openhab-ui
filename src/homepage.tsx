import { useState } from "react";
import ItemsIndex from "./pages/items-index";
import ThingsIndex from "./pages/things-index";
import PokemonIndex from "./pages/pokemon-index";
import "./homepage.css"

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
    <div className="main-page">
      <nav className="sidebar">
        <ul>
          {
            Object.keys(pages).map((key) => (
              <li >
                <button onClick={makeChoosePage(key)}>{key}</button>
              </li>
            ))
          }
        </ul>
      </nav>
      <section className="page">
        {pages[pageKey]}
      </section>
    </div>
  );
}

export default HomePage;
