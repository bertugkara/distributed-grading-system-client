import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthenticationContext from "../../../../context/AuthenticationContext";
import toastError, {toastSuccess, toastWarning} from "../../../../utilities/toast";
import {getAllExpertAndTeacherAndStudentDTO, handleSubmitCreateLesson} from "../../../../api/LessonApi";
import CreateClassView from "./CreateClassView";

export default function CreateClass() {

    const {auth, accountType} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lessonCode, setLessonCode] = useState("")

    const [instructorList, setInstructorList] = useState([]);
    const [expertList, setExpertList] = useState([]);
    const [studentList, setStudentList] = useState([]);


    function getAllExpertAndTeacherAndStudent() {
        getAllExpertAndTeacherAndStudentDTO().then((response) => {
            setInstructorList(response.data.data.teacherResponseDTOList);
            setExpertList(response.data.data.expertResponseDTOList);
            setStudentList(response.data.data.studentResponseDTOList);
        })
    }

    async function callSubmit(selectedInstructorList, selectedExpertList, selectedStudentList) {

        await handleSubmitCreateLesson(
            name,
            description,
            lessonCode,
            selectedInstructorList,
            selectedExpertList,
            selectedStudentList
        ).then((response) => {
            if (response.data.success == true) {
                toastSuccess("Successfully added");
            }
            if (response.data.success == false) {
                toastWarning(response.data.message);
            }
        }).catch((err) => {
            toastError(err);
        });


    }

    useEffect(() => {
        if (auth !== true) {
            navigate("/login")
        }
        if (accountType != "ADMIN") {
            toastWarning("Only Admins can reach here!")
            navigate("/")
        }
        getAllExpertAndTeacherAndStudent();
    }, [])


    return <div>
        <CreateClassView studentList={studentList}
                         expertList={expertList}
                         instructorList={instructorList}
                         name={name} setName={setName}
                         description={description} setDescription={setDescription}
                         lessonCode={lessonCode} setLessonCode={setLessonCode}
                         callSubmit={callSubmit}
        />

    </div>
}