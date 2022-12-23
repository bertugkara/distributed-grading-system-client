import HeaderComponent from "./HeaderComponent";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import ExpertInformationCard from "./card/ExpertInformationCard";
import StudentCard from "./card/StudentCard";
import TeacherCard from "./card/TeacherCard";
import {useNavigate} from "react-router-dom";

export default function ClassPageView(props) {

    const {classInfo, accountType } = props
    const navigate = useNavigate();

    const mainFeaturedPost = {
        title: classInfo.name,
        description: classInfo.description,
        lessonCode: classInfo.lessonCode
    };

    return <div>
        <div className={"lesson-page"}>
            <HeaderComponent post={mainFeaturedPost} addHomework={props.handleAddHomework} classID={props.classInfo.id} accountType={accountType}/>
            <Container maxWidth="bg">
                <Grid container>

                    <Grid item md={3}>
                        Experts:
                        <Box>
                            {classInfo.expertList !== [] ? classInfo.expertList.map((expert) => (
                                <ExpertInformationCard key={expert.id} post={expert}/>
                            )) : null}
                        </Box>
                    </Grid>
                    <Grid item md={1}></Grid>
                    <Grid item md={3} className={"student-grid"}>
                        Students:
                        <Box>
                            {classInfo.studentList.map((student) => (
                                <StudentCard key={student.id} post={student}/>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item md={1}></Grid>

                    <Grid item md={3} className={"professor-grid"}>
                        Teacher:
                        <Box>
                            {classInfo.instructor !== null ?
                                <TeacherCard key={classInfo.instructor.id}
                                             post={classInfo.instructor}/> : null}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    </div>
}