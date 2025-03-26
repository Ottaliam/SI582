import {useState} from "react";
import {IconButton, ListItem, ListItemButton, ListItemText, Box} from "@mui/material";

const Circle = ({ color }) => {
  return (
    <Box
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: color,
        border: "1px solid #ccc",
      }}
    />
  )
}

const ElementListItem = ({ nm, bg, fg }) => {
  const [name, setName] = useState(nm);
  const [background, setBackGround] = useState(bg);
  const [foreground, setForeground] = useState(fg);

  return (
    <ListItem
      secondaryAction={
      <>
        <IconButton edge="end" aria-label="color">
          <Circle color={background} />
        </IconButton>
        <IconButton edge="end" aria-label="color">
          <Circle color={foreground} />
        </IconButton>
      </>
      }
    >
      <ListItemButton>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  )
}

export default ElementListItem;