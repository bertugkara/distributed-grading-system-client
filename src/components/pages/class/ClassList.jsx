import AuthenticationContext from "../../context/AuthenticationContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAllClasses} from "../../api/LessonApi";
import toastError, {toastWarning} from "../../utilities/toast";
import ClassListView from "./ClassListView";


export default function ClassList(){

    const navigate = useNavigate();
    const { auth, accountType } = useContext(AuthenticationContext);
    const [lessons, setLessons] = useState([]);

    function getAllLessons() {
        getAllClasses().then((response) => {
            if(response.data.success==true) setLessons(response.data.data);
            else toastError("Fetching Error")
        })
    }

    useEffect(()=>{
        if(auth !=true) navigate("/login"), toastWarning("You should be Logged In!");
        else {
            getAllLessons();
        }
    },[])

    return <div>
        {
            <ClassListView lessons={lessons} accountType={accountType}/>
        }
    </div>
}

