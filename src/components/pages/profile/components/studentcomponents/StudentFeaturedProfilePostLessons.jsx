import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useEffect, useState} from "react";
import {getPassedOrFailedInfo} from "../../../../api/LessonApi";


export default function StudentFeaturedProfilePostLessons(props) {
    const { post } = props;
    const [result,setResult]=useState(false);
    console.log(post)
    useEffect(()=>{
        getPassedOrFailedInfo(post.id, JSON.parse(localStorage.getItem("user")).id).then((response) => {
            if(response.data.data == true){
                setResult(true)
            }
        });
    },[])
    return (
        <Grid item xs={15} md={30}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {post.name}
                        </Typography>
                        {result == true ?
                            < Typography color="green" component="h2" variant="h5"> You Are Successfull, passing
                            </Typography>:null
                        }
                        {result == false ?
                            < Typography color="red" component="h2" variant="h5"> You Are Unsuccessfull, failing
                            </Typography>:null
                        }
                        <Typography variant="subtitle1" color="text.secondary">
                            {post.lessonCode}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}
