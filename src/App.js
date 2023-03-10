import {useState} from "react";
import {useEffect} from "react";
import AuthenticationContext from "./components/context/AuthenticationContext";
import {Routes, Route, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./components/pages/mainpage/MainPage";
import Login from "./components/pages/login/Login";
import Profile from "./components/pages/profile/Profile";
import NavigationBar from "./components/layouts/NavigationBar/NavigationBar";
import './App.css'
import {ProSidebarProvider} from 'react-pro-sidebar';
import SideBarView from "./components/layouts/SideBar/SideBarView";
import Register from "./components/pages/useroperations/register/Register";
import CreateClass from "./components/pages/class/classactions/create/CreateClass";
import RegisterExpertTeacherExclusive from "./components/pages/useroperations/register/RegisterExpertTeacherExclusive";
import UserList from "./components/pages/userlist/UserList";
import ClassList from "./components/pages/class/classlist/ClassList";
import ClassEdit from "./components/pages/class/classactions/edit/ClassEdit";
import ClassPage from "./components/pages/class/classpage/ClassPage";
import {AddHomeWork} from "@mui/icons-material";
import AddHomework from "./components/pages/homework/homeworkactions/AddHomework";
import HomeworkSubmission from "./components/pages/homework/homeworksubmission/HomeworkSubmission";
import HomeworkSubmissionList from "./components/pages/homework/homeworksubmissiongrade/list/HomeworkSubmissionList";

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
        setAccountType(null)
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
                            <Route path="/login" element={<Login setAccountType={setAccountType}/>}/>
                            <Route exact path="/profile" element={<Profile/>}/>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route path="/users" element={<UserList/>}/>
                            <Route exact path="/registerExpertTeacherExclusive" element={<RegisterExpertTeacherExclusive/>}/>
                            <Route path="/createClass" element={<CreateClass/>}/>
                            <Route path="/" element={<MainPage/>}/>
                            <Route exact path="/class" element={<ClassList/>}/>
                            <Route exact path="/class/view/:id" element={<ClassPage/>}/>
                            <Route exact path="/class/edit/:id" element={<ClassEdit/>}/>
                            <Route exact path="/homework/addToClass/:id" element={<AddHomework/>}/>
                            <Route exact path="/homework/addSubmissionToId/:id" element={<HomeworkSubmission/>}/>
                            <Route exact path="/class/homeworkSubmissions/grade/:classID" element={<HomeworkSubmissionList/>}/>
                        </Routes>
                    </div>
                    <ToastContainer/>
                </ProSidebarProvider>
            </AuthenticationContext.Provider>
        </div>
    );
}

export default App;
