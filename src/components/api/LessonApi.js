import axios from './axios'
import authHeader from "./TokenHandler";

const GET_LESSONS_URL="/class/getAll"
export async function getAllClasses(){
    return await axios
        .get(GET_LESSONS_URL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
            },
        });
}

const GET_AllExpertAndTeacherAndStudent_URL="/admin/getAllExpertAndTeacherAndStudent"
export async function getAllExpertAndTeacherAndStudentDTO(){
    return await axios
        .get(GET_AllExpertAndTeacherAndStudent_URL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
            },
        });
}

const CREATE_LESSON_URL = "/class/add";
export async function handleSubmitCreateLesson(
    name,
    description,
    lessonCode,
    instructor,
    expertList,
    studentList
) {
    return await axios
        .post(
            CREATE_LESSON_URL,
            JSON.stringify({
                name,
                description,
                lessonCode,
                instructor,
                expertList,
                studentList,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(),
                },
            }
        )
}

export async function getClassInfo(id) {
    const GET_ONE_CLASS_URL = `/class/getOne/${id}` ;
    return await axios.get(GET_ONE_CLASS_URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': authHeader()
        }
    });
}


