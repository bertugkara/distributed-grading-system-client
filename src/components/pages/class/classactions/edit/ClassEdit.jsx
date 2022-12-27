import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {getAllExpertAndTeacherAndStudentDTO, getClassInfo, handleSubmitUpdateLesson} from "../../../../api/LessonApi";
import AuthenticationContext from "../../../../context/AuthenticationContext";
import {toastSuccess, toastWarning} from "../../../../utilities/toast";
import ClassEditView from "./ClassEditView";

export default function ClassEdit() {

    const {id} = useParams()
    const navigate = useNavigate();
    const {auth, accountType} = useContext(AuthenticationContext)
    const [classInfo, setClassInfo] = useState({})

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lessonCode, setLessonCode] = useState("")

    const [instructorList, setInstructorList] = useState([]);
    const [expertList, setExpertList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    const [tempStudentList, setTempStudentList] = useState([])
    const [tempExpertList, setTempExpertList] = useState([])
    const [tempTeacherList, setTempTeacherList] = useState([])

    async function getAllUsers() {
        await getAllExpertAndTeacherAndStudentDTO().then((response) => {
            setInstructorList(response.data.data.teacherResponseDTOList);
            setExpertList(response.data.data.expertResponseDTOList);
            setStudentList(response.data.data.studentResponseDTOList);
            performCopyArrays();
        });
    }

    async function fetchClassInfo() {
        await getClassInfo(id).then((response) => {
            if (response.data.success == true) {
                setClassInfo(response.data.data)
                setDescription(response.data.data.description)
                setName(response.data.data.name)
                setLessonCode(response.data.data.lessonCode)
            }
            if (response.data.success != true) {
                toastWarning("Fetching Problem!")
            }
        });
    }

    async function performCopyArrays() {

        let studentData = [];
        console.log(classInfo)
        classInfo.studentList.map((temp) => {
            studentData.push(temp.id)
        });
        setTempStudentList([...studentData]);

        let expertData = [];
        classInfo.expertList.map((tempEx) => {
            return expertData.push(tempEx.id)
        });
        setTempExpertList([...expertData])

        if (classInfo.instructor != null) setTempTeacherList(classInfo.instructor.id)
    }

    useEffect(() => {
        if (auth == true && (accountType === "ADMIN")) {
            fetchClassInfo().then();
            getAllUsers().then();
        } else {
            navigate("/")
            toastWarning("Only Admins can reach That page!")
        }
    }, [])

    async function sendEditRequest() {
        handleSubmitUpdateLesson(classInfo.id,name, description, lessonCode, tempTeacherList, tempExpertList, tempStudentList).then(response => {
            if (response.data.success == true) {
                toastSuccess("Successfull Update")
            } else {
                toastWarning("Error Occured")
            }
        })
    }

    function isValidToRender() {
        if (classInfo !== [] && studentList !== [] && expertList !== [] && instructorList !== []
            && tempExpertList !== [] && tempStudentList !== [] && tempTeacherList !== []
        ) {
            return true;
        } else {
            return false;
        }
    }

    return <div>
        {isValidToRender() ? <ClassEditView class={classInfo}
                                            instructorList={instructorList} studentList={studentList}
                                            expertList={expertList}
                                            description={description} setDescription={setDescription}
                                            lessonCode={lessonCode} setLessonCode={setLessonCode}
                                            name={name} setName={setName}
                                            sendEditRequest={sendEditRequest}
                                            tempExpertList={tempExpertList} setTempExpertList={setTempExpertList}
                                            tempStudentList={tempStudentList} setTempStudentList={setTempStudentList}
                                            tempTeacherList={tempTeacherList} setTempTeacherList={setTempTeacherList}
        /> : isValidToRender()}
    </div>
}