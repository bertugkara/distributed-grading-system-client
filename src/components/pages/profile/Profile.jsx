import {useContext, useEffect, useState} from "react";
import AuthenticationContext from "../../context/AuthenticationContext";
import {useNavigate} from "react-router-dom";
import {fillProfile} from "../../api/ProfileApi";
import toastError from "../../utilities/toast";
import StudentProfileView from "./components/studentcomponents/StudentProfileView";
import TeacherProfileView from "./components/teachercomponents/TeacherProfileView";
import ExpertProfileView from "./components/expertcomponents/ExpertProfileView";

export default function Profile() {

    const navigate = useNavigate();
    const {auth, accountType} = useContext(AuthenticationContext);
    const [view, setView] = useState(null);
    async function fillThePage() {
        let data = [];
        let URL = ""

        if (accountType.includes("ADMIN")) URL = "/admin/whoAmI";
        else if (accountType.includes("STUDENT")) URL = "/student/whoAmI";
        else if (accountType.includes("TEACHER") && accountType.includes("EXPERT")) URL = "/teacher/whoAmI";
        else if (!accountType.includes("TEACHER") && accountType.includes("EXPERT")) URL = "/expert/whoAmI";

        await fillProfile(URL, JSON.parse(localStorage.getItem("user")).id)
            .then((response => {
                if (response.data.data) {
                    data = response.data.data
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
    function setProfileView(data) {
        const mainFeaturedPost = {
            userID: data.id,
            title: data.firstName + " " + data.lastName,
            description: data.email,
        };
        //if (accountType.includes("ADMIN"))
        //   setView(<AdminProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
        if (accountType.includes("STUDENT")) {
            setView(<StudentProfileView data={data} mainFeaturedPost={mainFeaturedPost} accountType={accountType}/>)
        } else if (accountType.includes("TEACHER") && accountType.includes("EXPERT")) {
            setView(<TeacherProfileView data={data} mainFeaturedPost={mainFeaturedPost} accountType={accountType}/>)
        } else if (accountType.includes("EXPERT") && !accountType.includes("TEACHER")) {
            setView(<ExpertProfileView data={data} mainFeaturedPost={mainFeaturedPost} accountType={accountType}/>)
        }
    }


    return (<div>{view}</div>)
}
