import {Grid, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default function HeaderComponent(props){
    const {post, addHomework, accountType} = props;

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 6,
                minWidth:1200,
                maxWidth:1250,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />

            <Grid container >

                <Grid item md={8}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: {xs: 3, md: 8},
                            pr: {md: 0},
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {post.description}
                        </Typography>

                        <Typography variant="h6" color="inherit" paragraph>
                            Lesson Code: {post.lessonCode}
                        </Typography>
                    </Box>
                </Grid>


                <Grid item md={3}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: {xs: 3, md: 3},
                            pr: {md: 0},
                        }}
                    >
                        <Typography variant="h6" color="inherit" paragraph>
                            Lesson Actions:
                            <br></br>

                            { accountType == "ADMIN" || accountType == "TEACHER" ?
                                <Button className={"lesson-action-buttons"} onClick={() => {
                                    addHomework()
                                }}>Add Homework</Button> : null
                            }

                            <br></br>
                            <Button className={"lesson-action-buttons"} >
                                List All Homework Submissions</Button>

                        </Typography>
                    </Box>
                </Grid>

            </Grid>

        </Paper>
    )
        ;

}