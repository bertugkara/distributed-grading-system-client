import {useNavigate, useParams} from "react-router-dom";
import AddHomeworkView from "./AddHomeworkView";
import {useContext, useEffect, useState} from "react";
import AuthenticationContext from "../../../context/AuthenticationContext";
import {getClassInfo} from "../../../api/LessonApi";
import toastError, {toastSuccess, toastWarning} from "../../../utilities/toast";
import {createHomework} from "../../../api/HomeworkApi";

export default function AddHomework() {

    const navigate = useNavigate();
    const {auth, accountType} = useContext(AuthenticationContext)
    const {id} = useParams()

    let date = new Date();

    const [selectedStartDay, setSelectedStartDay] = useState({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    });
    const [selectedEndDay, setSelectedEndDay] = useState({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    });

    const [tempExpert, setTempExpert] = useState(null)
    const creatorID = JSON.parse(localStorage.getItem("user")).id
    const [description, setDescription] = useState("");
    const [classInfo, setClassInfo] = useState({})
    const [success, setSuccess] = useState(false)
    const [response, setResponse] = useState({})

    async function fetchLesson(id) {
        getClassInfo(id).then((response) => {
            if (response.data.success === true) setClassInfo(response.data.data);
        })
    }

    useEffect(() => {
            if (auth != true) navigate("/login")
            if ( !accountType.includes( "TEACHER" )) {
                navigate("/class")
                toastWarning("Only Teachers can add Homework")
            } else fetchLesson(id);
        }, []
    )

    async function handleSubmit() {
        console.log(creatorID)
        let startDate, endDate;
        if (selectedStartDay.month <= 9) {
            startDate = selectedStartDay.year + "-" + "0" + selectedStartDay.month + "-" + selectedStartDay.day;
        } else {
            startDate = selectedStartDay.year + "-" + selectedStartDay.month + "-" + selectedStartDay.day;
        }

        if (selectedEndDay.month <= 9) {
            endDate = selectedEndDay.year + "-" + "0" + selectedEndDay.month + "-" + selectedEndDay.day;
        } else {
            endDate = selectedEndDay.year + "-" + selectedEndDay.month + "-" + selectedEndDay.day;
        }

        createHomework(
            startDate.toString(),
            endDate.toString(),
            description,
            id,
            tempExpert,
            creatorID
        ).then((response) => {
            if (response.data.success === true) {
                toastSuccess("Succesfully Created");
                setResponse(response.data.data);
                setSuccess(true);
            } else {
                toastError("Something wrong, Could not created!!")
            }
        });

    }

    function isValidToRender() {
        if (classInfo === {}) {
            return false;
        } else return true;
    }

    return <div>
        {isValidToRender() ?
            <AddHomeworkView classID={id} accountType={accountType}
                             tempExpert={tempExpert} setTempExpert={setTempExpert}
                             creatorID={creatorID} classInfo={classInfo}
                             description={description} setDescription={setDescription}
                             selectedStartDay={selectedStartDay} setSelectedStartDay={setSelectedStartDay}
                             selectedEndDay={selectedEndDay} setSelectedEndDay={setSelectedEndDay}
                             handleSubmit={handleSubmit}
            /> : isValidToRender()
        }
    </div>
}