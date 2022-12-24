import Typography from "@mui/material/Typography";
import {Grid, Paper} from "@mui/material";
import Box from "@mui/material/Box";

export default function HeaderComponent(props) {
    const {post, accountType} = props;

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width:1200
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,128,255)',
                }}
            />

            <Grid container >

                <Grid item md={12}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: {xs: 10, md: 12},
                            pr: {md: 5},
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            Your ID: {post.userID}
                        </Typography>
                        <Typography variant="h6" color="inherit" paragraph>
                            Your E-mail:  {post.description}
                        </Typography>
                        <Typography variant="h6" color="inherit" paragraph>
                            You are {accountType}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

        </Paper>
    )
        ;

}
