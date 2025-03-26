import {List} from "@mui/material"
import ElementListItem from "./ElementListItem.jsx";
import {useState} from "react";

const ElementList = () => {
  const [elements, setElements] = useState([
    { name: "Element 1", background: "#ffcc00", foreground: "#333333" },
    { name: "Element 2", background: "#00ccff", foreground: "#ffffff" },
    { name: "Element 3", background: "#cc00ff", foreground: "#000000" },
  ]);

  return (
    <List>
      {elements.map((element, index) => (
        <ElementListItem
          key={index}
          nm={element.name}
          bg={element.background}
          fg={element.foreground}
        />
      ))}
    </List>
  )
}

export default ElementList;