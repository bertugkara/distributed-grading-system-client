import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";
import StudentFeaturedProfilePostLessons from "./StudentFeaturedProfilePostLessons";
import StudentFeaturedHomeworkSubmission from "./StudentFeaturedHomeworkSubmission";
import StudentFeaturedHomeworkPost from "./StudentFeaturedHomeworkPost";
import "../../Profile.css"
import HeaderComponent from "../HeaderComponent";

export default function StudentProfileView(props) {

    const {data, mainFeaturedPost} = props;
    return (
        <div>
            <div className={"lesson-page"}>
                <HeaderComponent post={mainFeaturedPost}/>
                <Container maxWidth="bg">
                    <Grid container>
                        {data.classList[0] ?
                            <Grid item md={4}>
                                Lessons You are Responsible:
                                <Box>
                                    {data.classList.map((lesson) => (
                                        <StudentFeaturedProfilePostLessons key={lesson.id} post={lesson}/>
                                    ))}
                                </Box>
                            </Grid> :
                            <Grid item md={4}>
                                You have not attended any lesson
                            </Grid>
                        }

                        {data.responsibleHomeworkList[0] ?
                            <Grid item md={4} className={"Homeworks-grid"}>
                                Homeworks:
                                <Box>
                                    {data.responsibleHomeworkList.map((tempHomework) => (
                                        <StudentFeaturedHomeworkPost key={tempHomework.id} post={tempHomework}
                                        />
                                    ))}
                                </Box>
                            </Grid> :
                            <Grid item md={4}>
                                <div><label> No homework assigned to you, yet! </label></div>
                            </Grid>

                        }

                        {data.submissionList[0] ?
                            <Grid item md={4} className={"Homeworks-submission-grid"}>
                                Homework Submissions:
                                <Box>
                                    {data.submissionList
                                        .map((tempHomework) => (
                                            <StudentFeaturedHomeworkSubmission key={tempHomework.id}
                                                                               post={tempHomework}
                                            />
                                        ))}
                                </Box>
                            </Grid> :

                            <Grid item md={4}>
                                <div>You have not send any homework submission</div>
                            </Grid>
                        }
                    </Grid>

                </Container>
            </div>

        </div>
    )
}