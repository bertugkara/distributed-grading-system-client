import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import CardActions from "@mui/material/CardActions";


export default function StudentFeaturedHomeworkPost(props) {
    const {post,key} = props;
    const navigate = useNavigate();

    function handleNavigate() {
        navigate(`/homework/addSubmissionToId/${post.id}`)
    }

    return (
        <Grid item xs={10} md={15}>
                <Card sx={{display: 'flex'}}>
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            {post.startDate + "-" + post.endDate}
                        </Typography>

                        <Typography variant="subtitle1" color="text.secondary">
                            {post.classDTO.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => {
                            handleNavigate()
                        }}>Perform Submission</Button>
                    </CardActions>
                </Card>
-        </Grid>
    );
}
