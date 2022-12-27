import axios from "./axios";
import authHeader from "./TokenHandler";

const ADD_COMMENT_URL = "comment/addParentComment"
export async function submitParentCommentByStudent(
    comment,studentID,homeworkSubmissionID
) {
    return await axios
        .post(ADD_COMMENT_URL
            ,
            JSON.stringify({
                comment:comment,
                homeworkSubmissionID: homeworkSubmissionID,
                studentID: studentID,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(),
                },
            }
        )
}

const GET_COMMENT_BY_HOMEWORK_SUBMISSION_URL = "comment/getByHomeworkSubmissionId"
export async function getCommentsByHomeworkSubmissionId(
    homeworkSubmissionID
) {
    return await axios
        .get(GET_COMMENT_BY_HOMEWORK_SUBMISSION_URL
            , {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(),
                },
                params:{
                    homeworkSubmissionID
                }
            });
}