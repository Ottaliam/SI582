import { useState, useMemo } from "react";
import {
  IconButton,
  Grid,
  Typography,
  Box,
  Popover,
  TextField,
  Alert,
  Button
} from "@mui/material";
import { ChromePicker } from "react-color";
import EditIcon from "@mui/icons-material/Edit";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Tooltip from '@mui/material/Tooltip';

const Circle = ({ color }) => (
  <Box
    sx={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      backgroundColor: color,
      border: "1px solid #ccc",
    }}
  />
);

// Helper functions
const hexToRgb = (hex) => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
};

const luminance = ({ r, g, b }) => {
  const a = [r, g, b].map((v) => {
    const val = v / 255;
    return val <= 0.03928
      ? val / 12.92
      : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

const getContrastRatio = (fg, bg) => {
  const L1 = luminance(hexToRgb(fg));
  const L2 = luminance(hexToRgb(bg));
  const light = Math.max(L1, L2);
  const dark = Math.min(L1, L2);
  return (light + 0.05) / (dark + 0.05);
};

const ElementListItem = ({ nm, bg, fg }) => {
  const [name, setName] = useState(nm);
  const [isEditing, setIsEditing] = useState(false);

  const [background, setBackGround] = useState(bg);
  const [foreground, setForeground] = useState(fg);

  const [anchorEl, setAnchorEl] = useState(null);
  const [pickerType, setPickerType] = useState(null); // 'bg' or 'fg'

  const handleOpenPicker = (event, type) => {
    setAnchorEl(event.currentTarget);
    setPickerType(type);
  };

  const handleClosePicker = () => {
    setAnchorEl(null);
    setPickerType(null);
  };

  const handleColorChange = (color) => {
    if (pickerType === "bg") {
      setBackGround(color.hex);
    } else {
      setForeground(color.hex);
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleNameChange = (e) => setName(e.target.value);
  const handleNameSubmit = () => setIsEditing(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleNameSubmit();
  };

  const open = Boolean(anchorEl);

  const contrastRatio = useMemo(
    () => getContrastRatio(foreground, background),
    [foreground, background]
  );

  const isLowContrast = contrastRatio < 4.5;

  return (
    <>
      <Grid container alignItems="center" sx={{ px: 2, py: 1 }}>
        <Grid item xs sx={{ display: "flex", alignItems: "center" }}>
          {isEditing ? (
            <TextField
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameSubmit}
              onKeyDown={handleKeyDown}
              size="small"
              autoFocus
              fullWidth
              variant="standard"
              inputProps={{ style: { fontSize: "1rem" } }}
            />
          ) : (
            <>
              <Typography sx={{ flexGrow: 1 }}>{name}</Typography>
              {isLowContrast && (
                <Tooltip title="Low contrast between background and foreground colors">
                  <WarningAmberIcon
                    color="warning"
                    fontSize="small"
                    sx={{ ml: 1 }}
                  />
                </Tooltip>
              )}
              <IconButton size="small" onClick={handleEditClick} className="edit-button">
                <EditIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Grid>

        <Grid item sx={{ width: 80, display: "flex", justifyContent: "center" }}>
          <IconButton onClick={(e) => handleOpenPicker(e, "bg")} className="color-button">
            <Circle color={background} />
          </IconButton>
        </Grid>

        <Grid item sx={{ width: 80, display: "flex", justifyContent: "center" }}>
          <IconButton onClick={(e) => handleOpenPicker(e, "fg")} className="color-button">
            <Circle color={foreground} />
          </IconButton>
        </Grid>
      </Grid>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePicker}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: 260 }}>
          <ChromePicker
            color={pickerType === "bg" ? background : foreground}
            onChange={handleColorChange}
            disableAlpha
            styles={{
              default: {
                picker: {
                  width: "100%",
                },
              },
            }}
          />

          {isLowContrast && (
            <Box>
              <Alert
                severity="warning"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                      const suggested = getContrastRatio("#000000", background) >= 4.5
                        ? "#000000"
                        : "#FFFFFF";
                      setForeground(suggested);
                    }}
                  >
                    Solve
                  </Button>
                }
              >
                Low Contrast (Ratio: {contrastRatio.toFixed(2)})
              </Alert>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default ElementListItem;
