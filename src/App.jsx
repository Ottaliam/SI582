import TopBar from "./TopBar/TopBar.jsx";
import ElementList from "./ElementList/ElementList.jsx";

import './App.css'
import {useEffect, useRef, useState} from "react";
import {Alert, Box, Button, Snackbar} from "@mui/material";

const App = () => {
  const [elements, setElements] = useState([
    { name: "Element 1", background: "#ffcc00", foreground: "#333333" },
    { name: "Element 2", background: "#00ccff", foreground: "#ffffff" },
    { name: "Element 3", background: "#cc00ff", foreground: "#000000" },
  ]);

  const [openAlert, setOpenAlert] = useState(false);

  const elementListRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'x') {
        setOpenAlert(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleSolve = () => {
    setOpenAlert(false);
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <TopBar setElements={setElements} />
      <ElementList elements={elements} ref={elementListRef} />

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleSolve}
            >
              Solve
            </Button>
          }
        >
          Low Contrast
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App
