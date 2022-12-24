import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";


export default function TeacherFeaturedHomeworkPost(props) {
    const {post,key} = props;
    const navigate = useNavigate();

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

            </Card>
        </Grid>
    );
}
