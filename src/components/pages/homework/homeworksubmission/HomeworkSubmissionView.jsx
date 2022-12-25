import {Form} from "react-bootstrap";
import SubmittedHomeworkDetails from "./SubmittedHomeworkDetails";
import './SubmitHomework.css'
import Button from "@mui/material/Button";


export default function HomeworkSubmissionView(props){
    console.log(props.selectedFile )


    return <div>
        <div className={"submit-homework"}>

            <Form>
                <Form.Group className="description-submit-homework" controlId="form">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Description"
                        onChange={(e) => {
                            props.setDescription(e.target.value);
                        }}
                    />
                </Form.Group>
            </Form>

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

            <label className="btn btn-default">
                <input type="file" onChange={(e) => props.setSelectedFile(e.target.files)} />
            </label>

            <Button
                className="btn btn-success"
                disabled={!props.selectedFile}
                onClick={() => props.handleUpload()}
            >
                Upload
            </Button>

            { props.isSuccess===false ? <div></div> :
                <SubmittedHomeworkDetails submission={props.response} />
            }

        </div>
    </div>
}