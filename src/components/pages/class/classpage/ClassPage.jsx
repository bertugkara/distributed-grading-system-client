import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthenticationContext from "../../../context/AuthenticationContext";
import {getClassInfo} from "../../../api/LessonApi";
import {toastWarning} from "../../../utilities/toast";
import ClassPageView from "./ClassPageView";

export default function ClassPage(){

    const {id} = useParams()
    const navigate = useNavigate();
    const {auth, accountType} = useContext(AuthenticationContext)
    const [classInfo, setClassInfo] = useState(undefined)

    async function fetchClassInfo(id) {
        await getClassInfo(id).then((response) => {
            if (response.data.success == true) {
                setClassInfo(response.data.data);
                console.log(response.data.data)
            }
            if (response.data.success != true) {
                toastWarning("Fetching Problem!")
            }
        });
    }

    useEffect(() => {
        if(auth != true ){
            navigate("/login")
        }
        else fetchClassInfo(id)
    },[])

    function isClassInfoFullFilled(){
        if(classInfo !== undefined){
            return true;
            console.log("true")
        }
        else return false;
    }

    return <div>
        { isClassInfoFullFilled() === true ?
            <ClassPageView classInfo={classInfo} accountType={accountType}/> : null
        }
    </div>
}