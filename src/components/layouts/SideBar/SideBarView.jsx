import {Sidebar, Menu, MenuItem, SubMenu, sidebarClasses} from 'react-pro-sidebar';
import {useContext} from "react";
import AuthenticationContext from "../../context/AuthenticationContext";
import {useNavigate} from "react-router-dom";

export default function SideBarView() {

    const {accountType} = useContext(AuthenticationContext)
    const navigate = useNavigate();

    function handleNavigate(URL) {
        navigate(URL);
    }

    return (<div style={{display: 'flex', height: '100%', color: "inherit"}}>
        <Sidebar rootStyles={{
            [`.${sidebarClasses.container}`]: {
                marginTop: 60,
                marginLeft: -15,
            },
        }}>
            <Menu>
                <MenuItem> Homeworks </MenuItem>
                <MenuItem> Homework Submissions </MenuItem>
                {accountType === "ADMIN" ? <MenuItem onClick={() => handleNavigate("/register")}> Register User </MenuItem> : null}
                <SubMenu label="Home">
                    <MenuItem> Home </MenuItem>
                    <MenuItem> Classes </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    </div>)
}