import {Download, EditOutlined} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import './HomeworkSubmissionList.css'
import {seeFile} from "../../../../api/HomeworkApi";
import Button from "@mui/material/Button";
import OpenDialogStudentSubmission from "./OpenDialogStudentSubmission";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {useState} from "react";

export default function HomeworkSubmissionListView(props) {

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
        let studentID = JSON.parse(localStorage.getItem("user")).id

        props.handleSendGrade(studentID, currentSubmissionID);
    };


    function handleDownloadButton(fileID, ownerID) {
        console.log("called")
        seeFile(fileID, ownerID).then((response) => {
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

    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'description', headerName: 'Description', width: 250},
        {
            field: "Grade", headerName: "Grade",
            renderCell: (cellValues) => {
                return (
                    <Button>
                        <EditOutlined onClick={() => handleClickOpen(cellValues.row.id)}/>
                    </Button>
                );
            }
            , width: 75
        },
        {
            field: "Download PDF",
            renderCell: (cellValues) => {
                return (
                    <Button>
                        <Download
                            onClick={() => handleDownloadButton(cellValues.row.fileDTO.id, cellValues.row.fileDTO.submissioner.id)}/>
                    </Button>
                );
            }
            , width: 125
        }
    ];

    return <div>
        {
            open === false ?
                <div>
                    <div className={"typography-homeworkSubmission"}>
                        <Typography component="h4" variant="h5">Submissions Of
                            Lesson {props.submissions[0].homework.classDTO.name}</Typography>
                        <br/>
                    </div>

                    <div className={"typography-homeworkSubmission"}>
                        <Typography> Remember All the Student information are hidden due to privacy </Typography>
                    </div>

                    <Box sx={{height: 650, width: 1000}}>
                        <DataGrid
                            rows={props.submissions}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                        />
                    </Box>
                </div>
                : <OpenDialogStudentSubmission setOpen={setOpen} open={open} handleCloseAndSave={handleCloseAndSave}
                                               handleClickOpen={handleClickOpen} handleClose={handleClose}
                                               grade={props.grade} setGrade={props.setGrade}
                                               comment={props.comment} setComment={props.setComment}
                />
        }
    </div>
}