import React from "react";
// import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function Loading() {
  return (
    <div>
      <Box sx={{ display: "flex",justifyContent:'center',alignItems:'center',marginTop:'50vh'}}>
        <CircularProgress  value={100} />
      </Box>
    </div>
  );
}
