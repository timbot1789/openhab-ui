import { useEffect, useState } from "react";
import Item from "../components/item";

function ThingsIndex() {
  const defaultUrl = "/rest/things"
  const [items, setItems] = useState([]);

  const fetchItems = async (url: string) => {
    const response = await fetch(url)
    const json = await response.json();
    setItems(json);
  }

  useEffect(() => {
    fetchItems(defaultUrl);
  }, []);

  return <div>
    <ul>
      {items.map((item) => (<li key={item.name}><Item name={item.name} /></li>))}
    </ul>
  </div>
}

export default ThingsIndex;
