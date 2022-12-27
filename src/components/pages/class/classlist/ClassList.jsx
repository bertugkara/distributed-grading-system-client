import AuthenticationContext from "../../../context/AuthenticationContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAllClasses} from "../../../api/LessonApi";
import toastError, {toastWarning} from "../../../utilities/toast";
import ClassListView from "./ClassListView";
import {RefreshRounded} from "@mui/icons-material";

export default function ClassList() {

    const navigate = useNavigate();
    const {auth, accountType, handleLogout} = useContext(AuthenticationContext);
    const [lessons, setLessons] = useState([]);

    function getAllLessons() {
        getAllClasses().then((response) => {
            if (response.data.success == true) {
                setLessons(response.data.data);
            } else if (response.status == 401) {
                toastWarning("Your Login is expired please Login Again")
                handleLogout();
                navigate("/login")
            }
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

    function isLessonsValid(lessons) {
        if (lessons === [] || lessons === null ) return false;
        else return true;
    }


    return <div>
        {
            isLessonsValid() ?
                <ClassListView accountType={accountType} lessons={lessons}
                               handleLessonPageButton={handleLessonPageButton}
                               handleEditButton={handleEditButton}
                /> :null
        }
    </div>
}

