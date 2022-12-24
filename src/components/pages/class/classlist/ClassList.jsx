import AuthenticationContext from "../../../context/AuthenticationContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAllClasses} from "../../../api/LessonApi";
import toastError, {toastWarning} from "../../../utilities/toast";
import ClassListView from "./ClassListView";
import {RefreshRounded} from "@mui/icons-material";

export default function ClassList() {

    const navigate = useNavigate();
    const {auth, accountType} = useContext(AuthenticationContext);
    const [lessons, setLessons] = useState([]);
    const [refresh, setRefresh]= useState(0);

    function getAllLessons() {
        getAllClasses().then((response) => {
            if (response.data.success == true) setLessons(response.data.data);
            else toastError("Fetching Error")
        });
    }

    function handleEditButton(lessonID) {
        navigate(`/class/edit/${lessonID}`)
    }

    function handleLessonPageButton(lessonID) {
        navigate(`/class/view/${lessonID}`)
    }

    useEffect(() => {
        if (auth != true) {
            navigate("/login")
            toastWarning("You should be Logged In!");
        } else {
            getAllLessons();
        }
    }, [])

    function isLessonsValid(lessons){
        if( lessons === []) return false;
        else return true;
    }

    function getAllLessonsWithTimer(){

        setTimeout(()=>{
            getAllLessons()
        },500);
    }

    return <div>
        {
                isLessonsValid() ?
                    <ClassListView accountType={accountType} lessons={lessons}
                                   handleLessonPageButton={handleLessonPageButton}
                                   handleEditButton={handleEditButton}
                    /> : <RefreshRounded onClick={getAllLessonsWithTimer}/>
        }
    </div>
}

