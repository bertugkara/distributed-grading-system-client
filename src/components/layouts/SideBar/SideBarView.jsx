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
                marginTop: 65,
                marginLeft: -15,
            },
        }}>
            <Menu>
                <MenuItem> Homework Submissions </MenuItem>
                { accountType.includes("TEACHER") && accountType.includes("EXPERT") ? <MenuItem onClick={() => handleNavigate("/registerExpertTeacherExclusive")}> Register Expert </MenuItem> : null}
                {accountType === "ADMIN" ? <MenuItem onClick={() => handleNavigate("/createClass")}> Create Class </MenuItem> : null}
                {accountType === "ADMIN" ? <MenuItem onClick={() => handleNavigate("/register")}> Register User </MenuItem> : null}
                {accountType === "ADMIN" ? <MenuItem onClick={() => handleNavigate("/users")}> Users </MenuItem> : null}
                <SubMenu label="Home">
                    <MenuItem onClick={() => handleNavigate("/")}> Home </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/class")}> Classes </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    </div>)
}