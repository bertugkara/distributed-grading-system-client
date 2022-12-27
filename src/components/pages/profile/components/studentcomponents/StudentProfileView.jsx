import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, {useState} from "react";
import StudentFeaturedProfilePostLessons from "./StudentFeaturedProfilePostLessons";
import StudentFeaturedHomeworkSubmission from "./StudentFeaturedHomeworkSubmission";
import StudentFeaturedHomeworkPost from "./StudentFeaturedHomeworkPost";
import "../../Profile.css"
import HeaderComponent from "../HeaderComponent";
import CommentListView from "../commentlist/CommentListView";

export default function StudentProfileView(props) {
    const {data, mainFeaturedPost, accountType} = props;

    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAndSave = () => {
        setOpen(false);
    };

    function handleOpenDialog(submissionID) {
        handleClickOpen();
    }

    return (
        <div>
            {open === false ?
                <div className={"lesson-page"}>
                    <HeaderComponent post={mainFeaturedPost} accountType={accountType}/>
                    <Container maxWidth="bg">
                        <Grid container>
                            {data.classList != null && data.classList.length > 0 ?
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

                            {data.responsibleHomeworkList != null && data.responsibleHomeworkList.length > 0 ?
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

                            {data.submissionList != null && data.submissionList.length > 0 ?
                                <Grid item md={4} className={"Homeworks-submission-grid"}>
                                    Homework Submissions:
                                    <Box>
                                        {data.submissionList
                                            .map((tempHomework) => (
                                                <StudentFeaturedHomeworkSubmission key={tempHomework.id}
                                                                                   post={tempHomework}
                                                                                   setComments={setComments}
                                                                                   comments={comments}
                                                                                   handleOpenDialog={handleOpenDialog}
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
                </div> : <CommentListView setOpen={setOpen} open={open} handleCloseAndSave={handleCloseAndSave}
                                          handleClickOpen={handleClickOpen} handleClose={handleClose}
                                          comment={comments} setComment={setComments}
                />
            }
        </div>
    )
}