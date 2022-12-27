import {Form} from "react-bootstrap";
import SubmittedHomeworkDetails from "./SubmittedHomeworkDetails";
import './SubmitHomework.css'
import Button from "@mui/material/Button";
import {Input} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function HomeworkSubmissionView(props) {
    console.log(props.selectedFile)

    function handleChangeDescription(e){
        props.setDescription(e.target.value)
    }
    console.log(props.description)
    return <div>
        <div className={"submit-homework"}>
            <Box>


            <Typography> Description: </Typography>
            <TextField fullWidth label="Description" onChange={handleChangeDescription}></TextField>
            <div>
                {props.selectedFile && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={props.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{width: props.progress + "%"}}
                        >
                            {props.progress}%
                        </div>
                    </div>
                )}
            </div>

            <label className="selectFile">
                <input type="file" onChange={(e) => props.setSelectedFile(e.target.files)}/>
            </label>

            <Button
                className="submit-button"
                fullWidth
                disabled={!props.selectedFile}
                onClick={() => props.handleUpload()}
            >
                Upload
            </Button>

            {props.isSuccess === false ? <div></div> :
                <SubmittedHomeworkDetails submission={props.response}/>
            }
            </Box>
        </div>
    </div>
}