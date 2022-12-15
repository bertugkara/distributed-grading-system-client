import {Sidebar, Menu, MenuItem, SubMenu, sidebarClasses} from 'react-pro-sidebar';

export default function SideBarView(){

    return(<div style={{ display: 'flex', height: '100%' , color:"inherit" }}>
       <Sidebar  rootStyles={{
             [`.${sidebarClasses.container}`]: {
                marginTop:58,
                 marginLeft:-15,
             },
         }}>
            <Menu>
                <MenuItem> Homeworks </MenuItem>
                <MenuItem> Homework Submissions </MenuItem>
                <SubMenu label="Home">
                    <MenuItem> Home </MenuItem>
                    <MenuItem> Classes </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    </div>)
}