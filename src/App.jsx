import TopBar from "./TopBar/TopBar.jsx";
import ElementList from "./ElementList/ElementList.jsx";

import './App.css'
import {useEffect, useRef, useState} from "react";
import {Alert, Box, Button, ListItem, ListItemButton, Popover, Snackbar, List} from "@mui/material";

const App = () => {
  const [elements, setElements] = useState([
    { name: "Element 1", background: "#ffcc00", foreground: "#333333" },
    { name: "Element 2", background: "#00ccff", foreground: "#ffffff" },
    { name: "Element 3", background: "#cc00ff", foreground: "#000000" },
  ]);

  const [openPopover, setOpenPopover] = useState(false);

  const anchorRef = useRef(null);

  const elementListRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState(null);

  const handleApply = () => {
    setOpenPopover(false);
  }

  const handleCancel = () => {
    setOpenPopover(false);
  }

  const availableColors = ["#ffcc00", "#00ccff", "#cc00ff", "#00ff00", "#ff0000", "#000000"];

  return (
    <Box sx={{ position: 'relative' }}>
      <TopBar setElements={setElements} />
      <ElementList elements={elements} ref={elementListRef} />

      <Popover
        open={openPopover}
        anchorEl={anchorRef.current}
        onClose={handleCancel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{ width: 300 }}
      >
        <Box sx={{ padding: 2 }}>
          <Box sx={{ textalign: 'center', marginBottom: 2 }}>Suggestions</Box>
          <List>
            {availableColors.map((color, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: "8px 16px"
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleApply}>Apply</Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

export default App
