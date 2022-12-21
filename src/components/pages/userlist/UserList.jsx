import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthenticationContext from "../../context/AuthenticationContext";
import toastError, {toastSuccess} from "../../utilities/toast";
import Box from "@mui/material/Box";
import {Switch} from "@mui/material";
import ActiveListView from "./views/ActiveListView";
import InactiveListView from "./views/InactiveListView";
import {
    assignUserAsActive,
    assignUserAsInactive,
    getActiveUsers,
    getInactiveUsers
} from "../../api/UserListOperationsApi";
import "./UserList.css"


export default function UserList() {

    const navigate = useNavigate();
    const [ActiveUserList, setActiveUserList] = useState([]);
    const [InActiveUserList, setInActiveUserList] = useState([]);
    const [myState, setMyState] = useState(false)

    const {auth, accountType} = useContext(AuthenticationContext);

    const handleChange = (event) => {
        setMyState(event.target.checked);
    };

    function handleMakeStudentPassive(id) {
        console.log("passive et")
        assignUserAsInactive(id)
            .then(() => {
                toastSuccess("Successfully Made Passive, We are Refreshing Page for you")
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            })
    }

    function handleMakeStudentActive(id) {
        console.log("aktif et")

        assignUserAsActive(id)
            .then(() => {
                toastSuccess("Successfully Made Active, We are Refreshing Page for you")
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            })

    }
    const tempActiveUserList = ActiveUserList.map((tempUser) => {
        return {
            id: tempUser.id,
            email: tempUser.email,
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            role: tempUser.role[0].name
        }
    });

    const tempInactiveUserList = InActiveUserList.map((tempUser) => {
        return {
            id: tempUser.id,
            email: tempUser.email,
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            username: tempUser.username,
            role: tempUser.role[0].name
        }
    });

    async function fetchUsers() {
        getActiveUsers().then((response) => {
            if (response.data.success === true) setActiveUserList(response.data.data);
            else toastError("Fetching Error!");
        })
        getInactiveUsers().then((response => {
            if (response.data.success === true) setInActiveUserList(response.data.data);
            else toastError("Fetching Error!");
        }))
    }

    useEffect(() => {
        if (auth !== true) {
            navigate("/login")
        }
        if (accountType !== 'ADMIN') {
            navigate("/")
            toastError("You have to be admin!");
        }
        fetchUsers();
    }, []);

    return <div>
        <Box className={"select-box"} sx={{minWidth: 1200}}>
            <span>Active Set </span>
            <Switch
                checked={myState}
                onChange={handleChange}
                inputProps={{'aria-label': 'controlled'}}
            />
            <span>Inactive Set</span>
        </Box>
        <div>
            {!myState ?
                <ActiveListView students={tempActiveUserList}
                                handleMakeStudentPassive={handleMakeStudentPassive}/> :
                <InactiveListView students={tempInactiveUserList}
                                  handleMakeStudentActive={handleMakeStudentActive}/>}
        </div>
    </div>
}