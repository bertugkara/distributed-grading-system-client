import {useParams} from "react-router-dom";
import {useState} from "react";
import toastError, {toastSuccess} from "../../../utilities/toast";
import HomeworkSubmissionView from "./HomeworkSubmissionView";
import {submitHomework} from "../../../api/HomeworkApi";
import './SubmitHomework.css'

export default function HomeworkSubmission(){

    const {id} = useParams()
    const creatorID= JSON.parse(localStorage.getItem("user")).id;

    const[description,setDescription]=useState("");
    const [selectedFile,setSelectedFile]=useState(undefined)
    const [progress,setProgress]=useState(0);
    const [isSuccess,setIsSuccess]=useState(false);
    const [response,setResponse]=useState({});

    console.log(selectedFile)
    function handleUpload(){
        console.log("girdi")

        let myForm= new FormData();
        myForm.append("request", new Blob([JSON.stringify({
                "description":description,
                "creatorID":creatorID,
                "homeworkID":id
            })],{
                type:"application/json"
            }
        ));
        myForm.append("file",selectedFile[0]);

        submitHomework(
            myForm
        ).then((response)=>{
            if(response.data.data) {
                setProgress(100)
                toastSuccess(response.data.message);
                setIsSuccess(true);
                setResponse(response.data.data)
            }
            else {
                toastError("Error Occured");
                setProgress(0)
            }
        });
    }
    return <div>
            <HomeworkSubmissionView description={description} setDescription={setDescription}
                                    selectedFile={selectedFile} setSelectedFile={setSelectedFile}
                                    progress={progress} setProgress={setProgress}
                                    isSuccess={isSuccess} setIsSuccess={setIsSuccess}
                                    response={response} setResponse={setResponse}
                                    handleUpload={handleUpload}
            />
    </div>
}