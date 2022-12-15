import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {LoginSharp} from "@mui/icons-material";
import {toastLoginWarning} from "../../utilities/toast";

export default function SignedOutNavBar() {

  return (
    <div>
        <div>
            <Box sx={{ flexGrow: 1, borderRadius: 5 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome To Grading System!
                        </Typography>

                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toastLoginWarning}
                        >
                            <LoginSharp />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    </div>
  );
}
