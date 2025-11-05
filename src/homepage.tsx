import { useState } from "react";
import Item from "./components/item";
import PokemonIndex from "./pages/pokemon-index";
import "./homepage.css"
import Index from "./pages/index-page";
import Thing from "./components/thing";
import type IItem from "./interfaces/iitem";

interface PagesList {
  [index: string]: React.ReactNode
}

function HomePage() {
  const [pageKey, setPageKey] = useState<string>(() => "Items")
  const pages: PagesList = {
    Items: Index(
      {
        url: '/rest/items', component: Item, parseItem: (json: { [key: string]: string }) => {
          return { id: json["name"], ...json } as IItem;
        }
      }
    ),
    Things: Index({ url: '/rest/things', component: Thing }),
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
