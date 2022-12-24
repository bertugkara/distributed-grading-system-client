import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getAllExpertAndTeacherAndStudentDTO, getClassInfo} from "../../../../api/LessonApi";
import AuthenticationContext from "../../../../context/AuthenticationContext";
import {toastWarning} from "../../../../utilities/toast";
import ClassEditView from "./ClassEditView";
import {RefreshRounded} from "@mui/icons-material";
import Button from "@mui/material/Button";


export default function ClassEdit() {

    const {id} = useParams()
    const navigate = useNavigate();
    const {auth, accountType} = useContext(AuthenticationContext)
    const [classInfo, setClassInfo] = useState({})

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lessonCode, setLessonCode] = useState("")
    const [refresher, setRefresher] = useState(0);

    const [instructorList, setInstructorList] = useState([]);
    const [expertList, setExpertList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    async function getAllUsers() {
        await getAllExpertAndTeacherAndStudentDTO().then((response) => {
            setInstructorList(response.data.data.teacherResponseDTOList);
            setExpertList(response.data.data.expertResponseDTOList);
            setStudentList(response.data.data.studentResponseDTOList);
        });
    }

    async function fetchClassInfo() {
        await getClassInfo(id).then((response) => {
            if (response.data.success == true) {
                setClassInfo(response.data.data)
            }
            if (response.data.success != true) {
                toastWarning("Fetching Problem!")
            }
        });
    }

    useEffect(() => {
        if (auth == true && (accountType === "ADMIN" || accountType === "TEACHER")) {
            fetchClassInfo().then();
            getAllUsers().then();
        } else {
            navigate("/")
            toastWarning("Only Admins And Teachers can reach That page!")
        }
    }, [])

    async function sendEditRequest() {

    }

    function isValidToRender() {
        if (classInfo != [] && studentList != [] && expertList != [] && instructorList != []) {
            console.log("true")
            return true;
        } else {
            console.log("true")
            return false;
        }
    }

    function getComponent() {
        const classEditView = <ClassEditView class={classInfo} accountType={accountType}
                                             studentList={studentList} expertList={expertList}
                                             instructorList={instructorList}
                                             description={description} setDescription={setDescription}
                                             lessonCode={lessonCode} setLessonCode={setLessonCode}
                                             name={name} setName={setName}
                                             sendEditRequest={sendEditRequest}
                                             isValidToRender={isValidToRender}
        />
        return classEditView;
    }

    return <div><Button onClick={() => setRefresher(refresher + 1)}> <RefreshRounded/></Button>
        {isValidToRender() ? getComponent() : isValidToRender() } </div>
}