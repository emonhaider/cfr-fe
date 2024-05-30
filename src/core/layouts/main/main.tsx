import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container, Link, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "./AppBar/app-bar";
import Drawer from "./Drawer/drawer";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any & { pt: number }) {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://www.linkedin.com/in/habibhaider/">
          Habib Haider
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Template Source: "}
        <Link
          color="inherit"
          href="https://github.com/mui/material-ui/tree/v5.15.18/docs/data/material/getting-started/templates/dashboard"
        >
          MUI Dashboard
        </Link>
      </Typography>
    </>
  );
}

export default function MainLayout() {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        open={open}
        toggleDrawer={() => {
          setOpen(!open);
        }}
      />
      <Drawer
        open={open}
        toggleDrawer={() => {
          setOpen(!open);
        }}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : "#3e3d42"),
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
