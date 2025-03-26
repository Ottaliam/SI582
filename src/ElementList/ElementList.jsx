import {List} from "@mui/material"

import ElementListItem from "./ElementListItem.jsx";

const ElementList = ({ elements }) => {
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