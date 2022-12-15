import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthenticationContext from "../../context/AuthenticationContext";
import LoginView from "./LoginView";
import toastError, {toastSuccess} from "../../utilities/toast";
import {SendPostLoginRequest} from "../../api/LoginApi";
export default function Login() {

    const navigate = useNavigate();
    const {auth, setAuth} =
        useContext(AuthenticationContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (auth === true) {
            navigate("/");
        }
    });

    function navigateToMain() {
        if (success === true) {
            navigate("/");
        }
    }

    function ClearPreviousLoginDataIfExists(){
        localStorage.removeItem("user");
        localStorage.removeItem("accountType");
        localStorage.removeItem("token");
    }

    function SetUserLogin(response){
        localStorage.setItem("user", JSON.stringify(response?.data) );
        localStorage.setItem("accountType", response.data.roles[0]);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setAuth(true);
    }

    function SendLoginRequest() {

        let response = SendPostLoginRequest(username, password);
        response.then((response) => {
            if (response.data.token) {
                ClearPreviousLoginDataIfExists();
                SetUserLogin(response);
                setSuccess(true);
                toastSuccess("Success Login");
                navigateToMain();
            } else {
                toastError("Failed to Login.");
                setSuccess(false)
                setAuth(false)
            }
        })

    }

    return (
        <div>
           <LoginView username={username} setUsername={setUsername} password={password} setPassword={setPassword} SendLoginRequest={SendLoginRequest} />
        </div>
    );
}