import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSubmissionsWithClassId, submitGrading} from "../../../../api/HomeworkApi";
import toastError, {toastSuccess} from "../../../../utilities/toast";
import HomeworkSubmissionListView from "./HomeworkSubmissionListView";


export default function HomeworkSubmissionList() {

    const {classID} = useParams();
    const [submissions, setSubmissions] = useState([])
    const [grade, setGrade] = useState(0);

    useEffect(() => {
        getSubmissionsWithClassId(classID).then((response) => {
            if (response.data.success = true) {
                setSubmissions(response.data.data)
            } else {
                toastError(response.data.message)
            }
        })
    }, []);

    useEffect(() => {
    }, [setSubmissions])

    async function handleSendGrade(studentID, submissionID) {
        submitGrading(studentID, submissionID, grade).then((response) => {
            if (response.data.success == true) {
                toastSuccess("Successfully Graded");
            } else {
                toastError(response.data.message)
            }
        })
    }

    function isSubmissionListValid(submissionList) {
        let result;
        if (submissionList.length != 0) {
            result = true;
        } else {
            result = false;
        }
        return result;
    }

    return <div>
        {isSubmissionListValid(submissions) ?
            <HomeworkSubmissionListView submissions={submissions} grade={grade} setGrade={setGrade}
                                        handleSendGrade={handleSendGrade}/> : null
        }
    </div>
}