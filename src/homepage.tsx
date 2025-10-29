import { useState, useEffect, type ReactElement } from "react";
import ItemsIndex from "./items-index";
import ThingsIndex from "./things-index";

function HomePage() {

  const [items, setItems] = useState<object[]>([1,2,3,4]);
  const [page, setPage] = useState<ReactElement>(() => <div></div>)

  async function fetchItems() {
    const res = await fetch('/band/items')

    setItems(await res.json());
  }

  useEffect(() => {
    fetchItems();
  }, [])

  type pageEntry = { name: string; component: () => ReactElement }
  const pages: pageEntry[] = [
    {name: "Items", component: () => ItemsIndex({items: items})},
    {name: "Things", component: () => ThingsIndex() }
  ];
  const makeChoosePage = (page: () => ReactElement) => {
    return () => {
      setPage(page)
    }
  }
  return (
    <div>
      <ul>
        {
          pages.map((pageObj) => (
            <li onClick={makeChoosePage(pageObj.component)}>
              {pageObj.name}
            </li>
            ))
        }
      </ul>
      <div>
        {page}
      </div>
    </div>
  );
}

export default HomePage;
