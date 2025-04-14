import { Box, Grid, Typography, Divider } from "@mui/material";
import ElementListItem from "./ElementListItem.jsx";

const ElementList = ({ elements }) => {
  return (
    <Box>
      {/* Header */}
      <Grid
        container
        alignItems="center"
        spacing={0}
        sx={{ px: 2, pb: 0, height: 40 }}  // tighter vertical spacing
      >
        <Grid item xs sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption">Name</Typography>
        </Grid>

        <Grid item sx={{ width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="caption">Background</Typography>
        </Grid>

        <Grid item sx={{ width: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="caption">Foreground</Typography>
        </Grid>
      </Grid>

      <Divider />

      {/* Item list */}
      <Box>
        {elements.map((element, index) => (
          <ElementListItem
            key={index}
            nm={element.name}
            bg={element.background}
            fg={element.foreground}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ElementList;
