import {useState} from "react";

import {IconButton, ListItem, ListItemButton, ListItemText, Box, Popover} from "@mui/material";
import {ChromePicker} from "react-color";

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

  const [anchorEl, setAnchorEl] = useState(null);
  const [pickerType, setPickerType] = useState(null); // 'bg' or 'fg'

  const handleOpenPicker = (event, type) => {
    setAnchorEl(event.currentTarget);
    setPickerType(type);
  }

  const handleClosePicker = () => {
    setAnchorEl(null);
    setPickerType(null);
  }

  const handleColorChange = (color) => {
    if (pickerType === 'bg') {
      setBackGround(color.hex);
    } else {
      setForeground(color.hex);
    }
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton edge="end" onClick={(e) => handleOpenPicker(e, 'bg')}>
              <Circle color={background} />
            </IconButton>
            <IconButton edge="end" onClick={(e) => handleOpenPicker(e, 'fg')}>
              <Circle color={foreground} />
            </IconButton>
          </>
        }
      >
        <ListItemButton>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
      
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePicker}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <ChromePicker
          color={pickerType === 'bg' ? background : foreground}
          onChange={handleColorChange}
          disableAlpha
        />
      </Popover>
    </>
  )
}

export default ElementListItem;