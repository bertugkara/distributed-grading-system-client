import {useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {seeFile} from "../../../../api/HomeworkApi";


export default function StudentFeaturedHomeworkSubmission(props) {

    const {post} = props;
    const [Url] = useState(post.fileDTO.url)

    function handleFileOpen() {
       seeFile(post.fileDTO.id, post.owner.id).then((response) => {
            const pdfBlob = new Blob([response.data], { type: "application/pdf" })
            const blobUrl = window.URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = blobUrl;
            link.setAttribute('download', "submission.pdf")
            link.click();
            link.remove();
            URL.revokeObjectURL(blobUrl);
        });
    }
    console.log(post)

    return (
        <div className={"submitted-homework-details-div-student"}>
            <Card sx={{maxWidth: 250}}>
                <CardContent>
                    <Typography variant="h6" component="div">
                       {post.homework.description}
                    </Typography>
                    <Typography sx={{}} color="text.secondary">
                        Deadline: {post.homework.endDate + " " + post.homework.endTime}
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