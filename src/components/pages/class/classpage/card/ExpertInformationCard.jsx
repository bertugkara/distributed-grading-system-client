import {Card, CardActionArea, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ExpertInformationCard(props) {
    const { post } = props;

    return (
        <Grid item xs={15} md={30}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            Expert Name: {post.firstName} {post.lastName}
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