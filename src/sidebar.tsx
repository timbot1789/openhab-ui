import { type FC, type PropsWithChildren, Children } from 'react';

const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  const childArr = Children.toArray(children);
  return <ul>
    { childArr.map((child) => (<li>{child}</li>)) }
  </ul>
}

export default Sidebar;
