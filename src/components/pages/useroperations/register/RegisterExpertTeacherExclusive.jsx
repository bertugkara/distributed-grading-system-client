import {useContext, useEffect, useState} from "react";
import toastError, {toastSuccess} from "../../../utilities/toast";
import {useNavigate} from "react-router-dom";
import AuthenticationContext from "../../../context/AuthenticationContext";
import {sendRegisterUserRequest} from "../../../api/RegisterApi";
import RegisterView from "./RegisterView";


export default function RegisterExpertTeacherExclusive(){

    const navigate = useNavigate();
    const {auth, accountType} = useContext(AuthenticationContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerLink, setRegisterLink] = useState(``);
    const [registerType, setRegisterType] = useState("EXPERT");
    const [user]=useState(JSON.parse(localStorage.getItem("user")));

    async function sendRegisterRequest() {
        await sendRegisterUserRequest(registerLink,
            email,
            username,
            firstName,
            lastName,
            password,
            user.roles.includes("TEACHER") ? user.id : null
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
        if (accountType.includes("TEACHER") && accountType.includes("EXPERT")){
            setRegisterType("EXPERT")
            setRegisterLink(`expert/add`);
        }
        else if (!accountType.includes( "TEACHER")) {
            toastError("You have to be admin to access this page!")
            navigate("/")
        }

        setRegisterLink(`expert/add`);
    }, []);


    return <div>

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
                           registerType={"EXPERT"}
            />}
        </div>
    </div>
}