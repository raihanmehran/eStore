import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4, background: "black" }}>
      <Toolbar>
        <Typography variant="h5"> eStore</Typography>
      </Toolbar>
    </AppBar>
  );
}
