import {useState} from "react";
import {useEffect} from "react";
import AuthenticationContext from "./components/context/AuthenticationContext";
import {Routes, Route, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./components/pages/mainPage/MainPage";
import Login from "./components/pages/login/Login";
import Profile from "./components/pages/profile/Profile";
import NavigationBar from "./components/layouts/NavigationBar/NavigationBar";
import './App.css'
import {ProSidebarProvider} from 'react-pro-sidebar';
import SideBarView from "./components/layouts/SideBar/SideBarView";
import Register from "./components/pages/userOperations/register/Register";
import CreateClass from "./components/pages/class/classActions/CreateClass";
import RegisterExpertTeacherExclusive from "./components/pages/userOperations/register/RegisterExpertTeacherExclusive";

function App() {

    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [accountType, setAccountType] = useState("")
    const [loggedInTrigger, setLoggedInTrigger]=useState(false)

    function handleLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('accountType');
        setAuth(false);
        navigate("/login")
    }

    const data = {auth, setAuth, accountType ,handleLogout, loggedInTrigger, setLoggedInTrigger};

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            setAuth(true);
            setAccountType(localStorage.getItem("accountType"));
        }
        if (auth !== true) {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        setAccountType(localStorage.getItem("accountType"));
    },[loggedInTrigger])

    return (<div className={"App"}>
            <AuthenticationContext.Provider value={data}>
                <ProSidebarProvider>
                   <div className={"SideBar"}> { auth === true ? <SideBarView/> : null } </div>
                    <div className={"NavigationBar"}>
                        <NavigationBar auth={auth} handleLogout={handleLogout} accountType={accountType}/>
                    </div>
                    <div className={"components"}>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route exact path="/registerExpertTeacherExclusive" element={<RegisterExpertTeacherExclusive/>}/>
                            <Route path="/createClass" element={<CreateClass/>}/>
                            <Route path="/" element={<MainPage/>}/>
                        </Routes>
                    </div>
                    <ToastContainer/>
                </ProSidebarProvider>
            </AuthenticationContext.Provider>
        </div>
    );
}

export default App;
