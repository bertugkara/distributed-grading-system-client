import HeaderComponent from "../HeaderComponent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StudentFeaturedProfilePostLessons from "../studentcomponents/StudentFeaturedProfilePostLessons";
import StudentFeaturedHomeworkPost from "../studentcomponents/StudentFeaturedHomeworkPost";
import StudentFeaturedHomeworkSubmission from "../studentcomponents/StudentFeaturedHomeworkSubmission";
import React, {useState} from "react";
import TeacherFeaturedProfilePostLesson from "./TeacherFeaturedProfilePostLessons";
import TeacherFeaturedHomeworkPost from "./TeacherFeaturedHomeworkPost";
import TeacherFeaturedHomeworkSubmissionObjection from "./TeacherFeaturedHomeworkSubmissionObjection";
import CommentListView from "../commentlist/CommentListView";


export default function TeacherProfileView(props) {

    const {data, mainFeaturedPost, accountType} = props;

    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState({});
    console.log(data)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAndSave = () => {
        setOpen(false);
    };
    console.log(data)
    return (
        <div> {open === false ?
            <div className={"lesson-page"}>
                <HeaderComponent post={mainFeaturedPost} accountType={accountType}/>
                <Container maxWidth="bg">
                    <Grid container>
                        {data.classList != null && data.classList.length > 0 ?
                            <Grid item md={4}>
                                Lessons You are Attending:
                                <Box>
                                    {data.classList.map((lesson) => (
                                        <TeacherFeaturedProfilePostLesson key={lesson.id} post={lesson}/>
                                    ))}
                                </Box>
                            </Grid> :
                            <Grid item md={4}>
                                You have not attended any lesson
                            </Grid>
                        }

                        {data.createdHomeworkList != null && data.createdHomeworkList.length > 0 ?
                            <Grid item md={4} className={"Homeworks-grid"}>
                                Homeworks:
                                <Box>
                                    {data.createdHomeworkList.map((tempHomework) => (
                                        <TeacherFeaturedHomeworkPost key={tempHomework.id} post={tempHomework}
                                        />
                                    ))}
                                </Box>
                            </Grid> :
                            <Grid item md={4}>
                                <div><label> You have not created any Homework </label></div>
                            </Grid>

                        }

                        {data.homeworkSubmissionPerformedObjection != null && data.homeworkSubmissionPerformedObjection.length > 0 ?
                            <Grid item md={4} className={"Homeworks-submission-grid"}>
                                Homework Submissions:
                                <Box>
                                    {data.homeworkSubmissionPerformedObjection
                                        .map((tempHomework) => (
                                            <TeacherFeaturedHomeworkSubmissionObjection key={tempHomework.id}
                                                                                        post={tempHomework}
                                                                                        comments={comments}
                                                                                        setComments={setComments}
                                                                                        handleClickOpen={handleClickOpen}
                                                                                        accountType={accountType}
                                            />
                                        ))}
                                </Box>
                            </Grid> :

                            <Grid item md={4}>
                                <div>No objection performed</div>
                            </Grid>
                        }
                    </Grid>
                </Container>
            </div> : <CommentListView setOpen={setOpen} open={open} handleCloseAndSave={handleCloseAndSave}
                                      handleClickOpen={handleClickOpen} handleClose={handleClose}
                                      comment={comments} setComment={setComments}
            />
        }
        </div>
    )
}