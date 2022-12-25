import AuthenticationContext from "../../../context/AuthenticationContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import toastError, {toastSuccess} from "../../../utilities/toast";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import RegisterView from "./RegisterView";
import './Register.css'
import {sendRegisterUserRequest} from "../../../api/RegisterApi";
import generatePassword from "../generateRandomPassword";

export default function Register() {

    const navigate = useNavigate();
    const {auth, accountType} = useContext(AuthenticationContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerLink, setRegisterLink] = useState(``);
    const [registerType, setRegisterType] = useState("STUDENT");

    async function sendRegisterRequest() {
        await sendRegisterUserRequest(registerLink,
            email,
            username,
            firstName,
            lastName,
            password,
        ).then((response) => {
            if (response.data.success == true) {
                toastSuccess("Successfull Registration")
            } else {
                toastError(response.data.message)
            }
        })
    }
    useEffect(() => {
        if (auth !== true) {
            navigate("/login")
        }
        else if (accountType !== "ADMIN") {
            toastError("You have to be admin to access this page!")
            navigate("/")
        }

        setRegisterLink(`${registerType.toLowerCase()}/add`);
    }, []);

    const handleChange = (event) => {
        setRegisterType(event.target.value);
        setRegisterLink(`${event.target.value.toLowerCase()}/add`);
    };


    return <div>
        <div className="register-div">
            What Type you want to Register:
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={registerType}
                        defaultValue="STUDENT"
                        label="Types"
                        onChange={handleChange}
                    >
                        <MenuItem value="STUDENT">Student</MenuItem>
                        <MenuItem value="TEACHER">Teacher</MenuItem>
                        <MenuItem value="EXPERT">Expert</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
        <div className="register">
            {<RegisterView setEmail={setEmail}
                           email={email}

                           setFirstName={setFirstName}
                           firstName={firstName}

                           setLastName={setLastName}
                           lastName={lastName}

                           setPassword={setPassword}
                           password={password}

                           setUsername={setUsername}
                           username={username}

                           sendRequest={sendRegisterRequest}
                           registerType={registerType}
            />}
        </div>
    </div>
}