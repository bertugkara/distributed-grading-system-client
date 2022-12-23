import {useContext, useEffect, useState} from "react";
import AuthenticationContext from "../../context/AuthenticationContext";
import {useNavigate} from "react-router-dom";
import {fillProfile} from "../../api/ProfileApi";
import toastError from "../../utilities/toast";
import StudentProfileView from "./components/studentcomponents/StudentProfileView";

export default function Profile(){

    const navigate = useNavigate();
    const {auth,accountType} = useContext(AuthenticationContext);
    const [view, setView] = useState(null);

    async function fillThePage(){
        let data=[];
        let URL;
        switch (accountType) {
            case  "ADMIN" :
                URL = "/admin/whoAmI";
                break;
            case "STUDENT":
                URL = "/student/whoAmI";
                break;
            case "EXPERT":
                URL = "/assistant/whoAmI";
                break;
            case "TEACHER":
                URL = "/professor/whoAmI";
                break;
        }

        await fillProfile(URL, JSON.parse(localStorage.getItem("user")).id)
            .then((response => {
                if (response.data.data) {
                    data=response.data.data
                    console.log(data)
                    setProfileView(data)

                } else {
                    toastError("Error Occured")
                }
            }))
    }

    useEffect(() => {
        if (auth !== true) {
            navigate("/login");
        }
        fillThePage();
    }, []);

    function setProfileView(data){
        const mainFeaturedPost = {
            userID: data.id,
            title: data.firstName +" " + data.lastName,
            description: data.email,
        };
        switch (accountType) {
            case  "ADMIN" :
             //   setView(<AdminProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
                break;
            case "STUDENT":
                setView(<StudentProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
                break;
            case "EXPERT":
           //     setView(<AssistantProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
                break;
            case "TEACHER":
           //     setView(<ProfessorProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
                break;
        }
    }

    return (<div>{view}</div>)
}
