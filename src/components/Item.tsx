import { useState } from "react";

interface ItemProps {
  label: string
  id: string
}

function Item({ label, id }: ItemProps) {
  const defaultUrl = `/rest/items/${id}`
  const [item, setItem] = useState(null);
  const [showItem, setShowItem] = useState(false)

  const fetchItem = async (url: string) => {
    const response = await fetch(url)
    const json = await response.json();
    setItem(json);
  }

  return <div onClick={() => setShowItem(!showItem)} onMouseEnter={() => fetchItem(defaultUrl)}>
    <p>{label}</p>
    {item && showItem && <article>
      <a href={item.link}>{item.name}</a>
      {JSON.stringify(item)}
      <ul>
        {item.commandDescription?.commandOptions.map((opt) => <li><p>{opt.command}</p><p>{opt.label}</p></li>)}
      </ul>
    </article>}
  </div>
}

export default Item;
