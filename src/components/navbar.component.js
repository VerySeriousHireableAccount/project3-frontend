import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function Navbar() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#b0abcb" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <Link to="/" className="nav-link">
            <Button style={{ backgroundColor: "#c2d5a8" }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                  color: "#666378",
                }}
              >
                P.E. Class Tracker
              </Typography>
            </Button>
          </Link>
          <ButtonGroup
            variant="contained"
            aria-label="contained button group"
            style={{ backgroundColor: "#a5d5d5" }}
          >
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/user" className="nav-link">
                <Button style={{ backgroundColor: "#f8d7e8" }}>
                  <Typography
                    sx={{
                      color: "#666378",
                    }}
                  >
                    1. Add Student
                  </Typography>
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/create" className="nav-link">
                <Button style={{ backgroundColor: "#f8d7e8" }}>
                  <Typography
                    sx={{
                      color: "#666378",
                    }}
                  >
                    2. Create Exercise Log
                  </Typography>
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/" className="nav-link">
                <Button style={{ backgroundColor: "#f8d7e8" }}>
                  <Typography
                    sx={{
                      color: "#666378",
                    }}
                  >
                    3. Exercises History
                  </Typography>
                </Button>
              </Link>
            </Box>
          </ButtonGroup>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
