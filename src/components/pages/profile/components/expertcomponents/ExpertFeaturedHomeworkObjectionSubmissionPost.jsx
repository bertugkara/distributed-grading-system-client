import {useState} from "react";
import {
    performObjection,
    redirectToExpert,
    seeFile,
    submitGrading,
    updateGradeFromTeacher
} from "../../../../api/HomeworkApi";
import toastError, {toastSuccess} from "../../../../utilities/toast";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {SearchRounded, Warning} from "@mui/icons-material";
import CardActions from "@mui/material/CardActions";
import OpenDialogStudentSubmission from "../../../homework/homeworksubmissiongrade/list/OpenDialogStudentSubmission";


export default function ExpertFeaturedHomeworkObjectionSubmissionPost(props) {

    const {post} = props;
    const [Url] = useState(post.fileDTO.url)
    const [grade, setGrade] = useState(0);
    const [open, setOpen] = useState(false);
    const [currentSubmissionID, setCurrentSubmissionId] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(true);
        setCurrentSubmissionId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAndSave = () => {
        setOpen(false);
        let userID = JSON.parse(localStorage.getItem("user")).id
        handleUpdateGrade(userID, currentSubmissionID);
    };

    function handleUpdateGrade(userID) {
        updateGradeFromTeacher(userID, currentSubmissionID, grade).then((response) => {
            if (response.data.success == true) {
                toastSuccess("Successfully Graded Again");
            } else {
                toastError(response.data.message)
            }
        })
    }


    function handleFileOpen() {
        seeFile(post.fileDTO.id, post.owner.id).then((response) => {
            const pdfBlob = new Blob([response.data], {type: "application/pdf"})
            const blobUrl = window.URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = blobUrl;
            link.setAttribute('download', "submission.pdf")
            link.click();
            link.remove();
            URL.revokeObjectURL(blobUrl);
        });
    }

    return (
        <div>
            {
                open === false ?
                    <div className={"submitted-homework-details-div-student"}>
                        <Typography>These are the Homework Submission performed objection by students.</Typography>
                        <Typography>For privacy you can not see Student details.</Typography>
                        <Typography>These objections sent by Responsible Teacher to you.</Typography>
                        <Typography>You can grade it and add comment!</Typography>
                        <Card sx={{maxWidth: 250}}>
                            <CardContent>
                                <Typography variant="h6" component="h4">
                                    {post.homework.description}
                                </Typography>

                                <Typography variant="h6" component="h6" color="green" className={"Objection-Button"}>
                                    Score : {post.gradeSubmission.givenPoint}
                                </Typography>
                                <br/>
                                {post.gradeSubmission.state === "SENT_TO_THE_EXPERT_BY_TEACHER" ?
                                    <Button onClick={() => handleClickOpen(post.gradeSubmission.id)}>Grade The Objection <SearchRounded/> </Button> :
                                    <text>You successfully re-graded that Objection.</text>
                                }

                                <CardActions>
                                    <Button size="small" onClick={() => {
                                        handleFileOpen()
                                    }}>Submitted Homework</Button>
                                </CardActions>
                            </CardContent>

                        </Card>

                    </div> : <OpenDialogStudentSubmission setOpen={setOpen} open={open} handleCloseAndSave={handleCloseAndSave}
                                                          handleClickOpen={handleClickOpen} handleClose={handleClose}
                                                          grade={grade} setGrade={setGrade}/>

            }
        </div>
    )
}