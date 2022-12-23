import {useState} from "react";
import {seeFile} from "../../../api/HomeworkApi";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import './SubmitHomework.css'

export default function SubmittedHomeworkDetails(props){

    const {submission} = props;
    const [Url] = useState(submission.fileDTO.url)
    console.log(submission.fileDTO.id)
    function handleFileOpen() {
        seeFile(submission.fileDTO.id, submission.owner.id).then((response) => {

            const pdfBlob = new Blob([response.data], { type: "application/pdf" })
            const blobUrl = window.URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = blobUrl;
            link.setAttribute('download', `${submission.owner.id}.pdf`)
            link.click();
            link.remove();
            URL.revokeObjectURL(blobUrl);

        });
    }


    return (
        <div className={"submitted-homework-details-div"}>
            <Card sx={{minWidth: 500}}>
                <CardContent>

                    <Typography variant="h5" component="div">
                        Description: {submission.homework.description}
                    </Typography>
                    <Typography variant="body2">
                        Submitted Person: {submission.owner.firstName + " " + submission.owner.lastName}
                    </Typography>
                    <CardActions>
                        <Button size="small" onClick={() => {
                            handleFileOpen()
                        }}>See Submitted File</Button>
                    </CardActions>
                </CardContent>

            </Card>

        </div>
    )

}