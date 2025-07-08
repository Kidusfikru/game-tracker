import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Layout = ({ title, children, topContent }) => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Typography variant="h3" align="center" gutterBottom fontWeight={700}>
      {title}
    </Typography>
    {topContent && <Box sx={{ my: 2 }}>{topContent}</Box>}
    <Box sx={{ my: 4 }}>{children}</Box>
  </Container>
);

export default Layout;
