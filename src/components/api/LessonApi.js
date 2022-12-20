import axios from './axios'
import authHeader from "./TokenHandler";

const CREATE_LESSON_URL = "/class/add";
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

