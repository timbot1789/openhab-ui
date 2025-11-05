import { useEffect, useState, type ReactNode } from "react";
import type IItem from "../interfaces/iitem";
interface ComponentProps {
  label: string;
  id: string;
  children?: ReactNode
}
interface IndexProps {
  url: string;
  component: ({ label, id }: ComponentProps) => ReactNode
  parseItem?: (json: { [key: string]: string }) => IItem
}

function convertToArray(json: object | object[]) {
  return Array.isArray(json) ? json : [json]
}

function Index({ url, component: Component, parseItem }: IndexProps) {
  parseItem ||= (json: object) => {
    return { label: "unknown label", ...json } as IItem;
  };
  const [items, setItems] = useState<IItem[]>([]);

  const fetchItems = async (url: string) => {
    const response = await fetch(url)
    const json = await response.json();
    setItems(convertToArray(json).map(parseItem));
  }

  useEffect(() => {
    fetchItems(url);
  }, []);

  return <div>
    <ul>
      {items.map((item) => (
        <li key={item.label}>
          <Component label={item.label} id={item.id} />
        </li>))}
    </ul>
  </div>
}

export default Index;
