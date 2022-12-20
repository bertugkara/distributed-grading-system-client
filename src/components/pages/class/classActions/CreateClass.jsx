import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthenticationContext from "../../../context/AuthenticationContext";
import {toastWarning} from "../../../utilities/toast";
import {getAllExpertAndTeacherAndStudentDTO} from "../../../api/LessonApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function CreateClass() {

    const {auth, accountType} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lessonCode,setLessonCode]=useState("")

    const [instructorList, setInstructorList] = useState([]);
    const [expertList, setExpertList] = useState([]);
    const [studentList, setStudentList] = useState([]);

    function getAllExpertAndTeacherAndStudent(){
        getAllExpertAndTeacherAndStudentDTO().then((response) => {
            setInstructorList(response.data.data.teacherResponseDTOList);
            setExpertList(response.data.data.expertResponseDTOList);
            setStudentList(response.data.data.studentResponseDTOList);
        })
    }

    useEffect(() => {
        if( auth !== true){
            navigate("/login")
        }
        if(accountType != "ADMIN"){
            toastWarning("Only Admins can reach here!")
            navigate("/")
        }
        getAllExpertAndTeacherAndStudent();
    },[])

    console.log(instructorList,
        expertList,
        studentList);

    return <div>

    </div>
}