import {useState} from "react";

import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PageviewIcon from "@mui/icons-material/Pageview";
import CodeIcon from "@mui/icons-material/Code";

const TopBar = ({ setElements }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleAddElement = () => {
    const newElement = {
      name: "Example Element",
      background: "#ff0000",
      foreground: "#ffffff"
    }

    setElements((prevElements) => [...prevElements, newElement]);
    handleClose();
  }

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="primary" onClick={handleClick}>
              <AddIcon />
            </IconButton>
            <IconButton color="primary">
              <FileDownloadIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div">
            Color Changer
          </Typography>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={handleAddElement}>
          <PageviewIcon sx={{ mr: 1 }} />
          Select Element in Page
        </MenuItem>
        <MenuItem onClick={handleAddElement}>
          <CodeIcon sx={{ mr: 1 }} />
          Select with CSS Selector
        </MenuItem>
      </Menu>
    </>
  )
}

export default TopBar;