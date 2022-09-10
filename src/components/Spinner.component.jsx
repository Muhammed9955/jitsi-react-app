import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
// import colors from "../../utils/colors";

function Spinner({ size, className, style, isButton, color = "white" }) {
  return (
    <CircularProgress
      size={size}
      className={className}
      // style={style}
      style={{ color: color }}
    />
  );
}

export default Spinner;
