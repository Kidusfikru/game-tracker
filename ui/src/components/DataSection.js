import React from "react";
import { Paper, Box, CircularProgress, Alert } from "@mui/material";

const DataSection = ({ loading, error, children }) => (
  <Box sx={{ my: 4 }}>
    <Paper elevation={3} sx={{ p: 2 }}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        children
      )}
    </Paper>
  </Box>
);

export default DataSection;
