import {Card, CardActionArea, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function TeacherCard(props) {
    const {post} = props;

    return (
        <Grid item xs={25} md={40}>
            <CardActionArea component="a" href="#">
                <Card sx={{display: 'flex'}} onClick={() => {
                }}>
                    <CardContent sx={{flex: 1}}>
                        <Typography component="h2" variant="h5">
                            Teacher Name: {post.firstName} {post.lastName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Email: {post.email}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}
