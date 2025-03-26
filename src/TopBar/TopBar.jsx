import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const TopBar = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="primary">
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
  )
}

export default TopBar;