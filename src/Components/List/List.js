import React from "react";
import Item from "../Item/Item";

const List = ({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
};

export default List;
