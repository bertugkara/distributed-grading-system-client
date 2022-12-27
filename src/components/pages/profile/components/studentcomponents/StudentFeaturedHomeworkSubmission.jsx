import {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {performObjection, seeFile} from "../../../../api/HomeworkApi";
import {Warning} from "@mui/icons-material";
import {toastSuccess} from "../../../../utilities/toast";
import {getCommentsByHomeworkSubmissionId} from "../../../../api/CommentsApi";

export default function StudentFeaturedHomeworkSubmission(props) {

    const {post} = props;

    function handleObjection(gradeSubmissionId) {
        performObjection(gradeSubmissionId, JSON.parse(localStorage.getItem("user")).id).then((response) => {
            toastSuccess("Objection Performed. Wait For Teacher Response, please Refresh Page")
        })
    }

    useEffect(() => {
        getComments(post.id);
    }, [])

    function getComments(submissionID) {
        getCommentsByHomeworkSubmissionId(submissionID).then((response) => {
            props.setComments(response.data.data)
        });
    }

    function handleOpenView(submissionID) {
        props.handleOpenDialog(submissionID)
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

    console.log(props.comments)
    return (
        <div className={"submitted-homework-details-div-student"}>
            <Card sx={{maxWidth: 250}}>
                <CardContent>
                    <Typography variant="h6" component="h4">
                        {post.homework.description}
                    </Typography>
                    {post.gradeSubmission.id != null ?
                        <Typography variant="h6" component="h6" color="green">
                            Your Homework Is graded!
                        </Typography>
                        : null}
                    {post.gradeSubmission.id != null ?
                        <Typography variant="h6" component="h6" color="green" className={"Objection-Button"}>
                            Score : {post.gradeSubmission.givenPoint}
                        </Typography> :
                        <Typography variant="h6" component="h6" color="red" className={"Objection-Button"}>
                            Not Graded Yet
                        </Typography>
                    }

                    {post.gradeSubmission.state !== "OBJECTION_FROM_GRADED" && post.gradeSubmission.id != null ?
                        <Button size="small" onClick={() => handleObjection(post.gradeSubmission.id)}> Click Here to
                            Objection!
                            <Warning/>
                        </Button> : null
                    }

                    <CardActions>
                        <Button size="small" onClick={() => {
                            handleFileOpen()
                        }}>Submitted File</Button>
                        {props.comments != null ?
                            <Button onClick={() => handleOpenView(post.id)}>
                                See Comments
                            </Button> : null}
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    )
}