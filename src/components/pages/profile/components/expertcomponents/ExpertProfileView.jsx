import HeaderComponent from "../HeaderComponent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";
import ExpertFeaturedProfilePostLesson from "./ExpertFeaturedProfilePostLesson";
import ExpertFeaturedProfileHomeworkPost from "./ExpertFeaturedProfileHomeworkPost";
import ExpertFeaturedHomeworkObjectionSubmissionPost from "./ExpertFeaturedHomeworkObjectionSubmissionPost";


export default function ExpertProfileView(props) {

    const {data, mainFeaturedPost, accountType} = props;
    console.log(data)
    return (
        <div>
            <div className={"lesson-page"}>
                <HeaderComponent post={mainFeaturedPost} accountType={accountType}/>
                <Container maxWidth="bg">
                    <Grid container>
                        {data.classList != null && data.classList.length > 0 ?
                            <Grid item md={4}>
                                Lessons You are Responsible As Expert:
                                <Box>
                                    {data.classList.map((lesson) => (
                                        <ExpertFeaturedProfilePostLesson key={lesson.id} post={lesson}/>
                                    ))}
                                </Box>
                            </Grid> :
                            <Grid item md={4}>
                                You have not attended any lesson
                            </Grid>
                        }

                        {data.responsibleHomeworkList != null && data.responsibleHomeworkList.length > 0 ?
                            <Grid item md={4} className={"Homeworks-grid"}>
                                Responsible Homework List:
                                <Box>
                                    {data.responsibleHomeworkList.map((tempHomework) => (
                                        <ExpertFeaturedProfileHomeworkPost key={tempHomework.id} post={tempHomework}
                                        />
                                    ))}
                                </Box>
                            </Grid> :
                            <Grid item md={4}>
                                <div><label> You have not assigned to any Homework </label></div>
                            </Grid>

                        }

                        {data.homeworkSubmissionPerformedObjection != null && data.homeworkSubmissionPerformedObjection.length > 0 ?
                            <Grid item md={4} className={"Homeworks-submission-grid"}>
                                Homework Submissions:
                                <Box>
                                    {data.homeworkSubmissionPerformedObjection
                                        .map((tempHomework) => (
                                            <ExpertFeaturedHomeworkObjectionSubmissionPost key={tempHomework.id}
                                                                                           post={tempHomework}
                                            />
                                        ))}
                                </Box>
                            </Grid> :

                            <Grid item md={4}>
                                <div>No objection sent to you!</div>
                            </Grid>
                        }
                    </Grid>

                </Container>
            </div>

        </div>
    )
}