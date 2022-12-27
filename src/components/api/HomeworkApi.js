import axios from './axios'
import authHeader from "./TokenHandler";

const ADD_HOMEWORK_URL = "/homework/addHomework"

export async function createHomework(startDate,
                                     endDate,
                                     description,
                                     classID,
                                     expertID,
                                     creatorID
) {
    return await axios
        .post(
            ADD_HOMEWORK_URL,
            JSON.stringify({
                startDate,
                endDate,
                description,
                classID,
                expertID,
                creatorID
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': authHeader()
                }
            }
        )
}

const SUBMIT_HOMEWORK_URL = "homeworkSubmissions/addSubmission"

export async function submitHomework(
    formData
) {

    return await axios
        .post(
            SUBMIT_HOMEWORK_URL,
            formData,
            {
                headers: {
                    "Content-Type": undefined,
                    Authorization: authHeader(),
                },
            }
        );
}

export async function seeFile(fileID,
                              creatorID
) {
    const GET_ONE_HOMEWORK_SUBMISSION_URL = `file/seeFile/${fileID}`
    let config = {
        responseType: 'blob',
        headers: {
            Authorization: authHeader(),
            "Content-Type": "application/json",
        },
        params: {
            creatorID,
        },
    };
    return await axios
        .get(GET_ONE_HOMEWORK_SUBMISSION_URL, config);

}

export async function getSubmissionsWithClassId(id) {
    const GET_SUBMISSION_URL = `/homeworkSubmissions/getAllSubmissionsByClassId/${id}`;
    return await axios.get(GET_SUBMISSION_URL, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': authHeader()
        }
    });
}

const SUBMIT_GRADE_URL = "grade/gradeSubmission"
export async function submitGrading(
    studentID, submissionID, grade
) {
    console.log(submissionID)
    return await axios
        .post(SUBMIT_GRADE_URL
            ,
            JSON.stringify({
                graderStudentID: studentID,
                homeworkSubmissionID: submissionID,
                point: grade,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(),
                },
            }
        )
}


const PERFORM_OBJECTION_URL = "grade/performObjection"

export async function performObjection(gradeSubmissionId, userPerformedObjectionId) {
    let config = {
        headers: {
            Authorization: authHeader(),
            "Content-Type": "application/json",
        },
        params: {
            gradeSubmissionId,
            userPerformedObjectionId
        },
    };
    return await axios
        .post(PERFORM_OBJECTION_URL, null, config);
}

const SEND_GRADE_UPDATE_URL = "grade/updateSubmissionExpert"
export async function updateGradeFromTeacher(
    teacherID, submissionID, grade
) {
    return await axios
        .post(SEND_GRADE_UPDATE_URL
            ,
            JSON.stringify({
                point: grade,
                teacherID: teacherID,
                expertID: null,
                currentGradeSubmissionId: submissionID
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(),
                },
            }
        )
}

const SEND_TO_EXPERT_URL = "grade/redirectToExpert"
export async function redirectToExpert(
    id
) {
    return await axios
        .post(SEND_TO_EXPERT_URL, null, {
            headers: {
                Authorization: authHeader(),
                "Content-Type": "application/json",
            },
            params: {
                id
            },
        })
}