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