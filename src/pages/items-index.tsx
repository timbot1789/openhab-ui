import { useEffect, useState } from "react";

function ItemsIndex() {
  const defaultUrl = "/rest/items"
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
      {items.map((item) => (<li key={item.name}>{item.name}</li>))}
    </ul>
  </div>
}

export default ItemsIndex;
