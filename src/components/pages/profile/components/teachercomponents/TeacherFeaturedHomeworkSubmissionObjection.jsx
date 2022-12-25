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
import OpenDialog from "../../../homework/homeworksubmissiongrade/list/OpenDialog";


export default function TeacherFeaturedHomeworkSubmissionObjection(props) {

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

    function handleRedirectToExpert(id){
        redirectToExpert(id).then((response)=>{
            if(response.data.success==true){
                toastSuccess("Redirected To Expert");
            }
            else {
                toastError("Error Occured")
                console.log(response.data)
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
                        <Typography>You redirect the objection to Expert which you will choose from list</Typography>
                        <Typography>or you can grade it by yourself</Typography>
                        <Card sx={{maxWidth: 250}}>
                            <CardContent>
                                <Typography variant="h6" component="h4">
                                    {post.homework.description}
                                </Typography>

                                <Typography variant="h6" component="h6" color="green" className={"Objection-Button"}>
                                    Score : {post.gradeSubmission.givenPoint}
                                </Typography>
                                {post.gradeSubmission.state === "OBJECTION_FROM_GRADED" ?
                                    <Button size="small"
                                    onClick={() => handleRedirectToExpert(post.gradeSubmission.id)}
                                    > Redirect To Expert
                                        <Warning/>
                                    </Button> : <text>Redirection Success</text>
                                }
                                <br/>
                                {post.gradeSubmission.state !== "GRADED_AFTER_OBJECTION_BY_TEACHER" ?
                                    <Button onClick={() => handleClickOpen(post.gradeSubmission.id)}>Grade by
                                    Yourself <SearchRounded/> </Button> : <text>You successfully re-graded that Objection.</text>
                                }

                                <CardActions>
                                    <Button size="small" onClick={() => {
                                        handleFileOpen()
                                    }}>Submitted Homework</Button>
                                </CardActions>
                            </CardContent>

                        </Card>

                    </div> : <OpenDialog setOpen={setOpen} open={open} handleCloseAndSave={handleCloseAndSave}
                                         handleClickOpen={handleClickOpen} handleClose={handleClose}
                                         grade={grade} setGrade={setGrade}/>

            }
        </div>
    )
}