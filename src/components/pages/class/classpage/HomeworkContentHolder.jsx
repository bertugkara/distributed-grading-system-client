import {Card, CardActionArea, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default function HomeworkContentHolder(props){

    const { homework,submitButton } = props;
    return (
        <Grid item xs={15} md={30}>
            <CardActionArea component="a">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {homework.description}
                        </Typography>
                        <Typography component="h2" variant="h5">
                            Deadline:
                        </Typography>
                        <Typography component="h2" variant="h5">
                            <Button onClick={()=> submitButton(homework.id)}>Submit Homework</Button>
                        </Typography>

                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}