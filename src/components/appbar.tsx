import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

function NavBar() {
  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        sx={{
          marginBottom: "2rem",
          height: { lg: "30vh", xs: "10vh" },
          backgroundColor: "#3F25A8",
          paddingX: { lg: "50px" },
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                "& *": {
                  fontSize: "1.6rem",
                },
              }}
            >
              <Typography>go</Typography>
              <Typography fontWeight="bold">finances</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
              <Typography>Listagem</Typography>
              <Typography>Importar</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
