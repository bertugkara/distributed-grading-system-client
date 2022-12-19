import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {
    Home,
    Logout,
} from "@mui/icons-material";
import {useProSidebar} from "react-pro-sidebar";
import SideBarView from "../SideBar/SideBarView";

export default function SignedInNavBar(props) {

    const { collapseSidebar, toggleSidebar, collapsed, toggled } = useProSidebar();

    const navigate = useNavigate();
    const [anchorEl,setAnchorEl] = useState(null);

    const handleCloseProfile = () => {
        setAnchorEl(null);
        navigate("/profile")
    };

    const handleCloseHome = () => {
        setAnchorEl(null);
        navigate("/")
    };

    const handleOpenSideBar = () => {
        if(collapsed === true) {
            toggleSidebar(true);
        }
        else {
           collapseSidebar(true);
        }
    }

    return (
        <div>
            <Box sx={{flexGrow: 1, borderRadius: 2}}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleOpenSideBar}
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Student Grading System
                        </Typography>
                        {props.auth && (
                            <div>
                                <span>{ JSON.parse(localStorage.getItem("user")).email} </span>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleCloseHome}
                                    color="inherit"
                                >
                                    <Home/>
                                </IconButton>

                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleCloseProfile}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>

                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={props.signOut}
                                    color="inherit"
                                >
                                    <Logout/>
                                </IconButton>
                            </div>
                        )}
                    </Toolbar>
                    {toggled === true ? <SideBarView/> : null}
                </AppBar>
            </Box>
        </div>

    )
}