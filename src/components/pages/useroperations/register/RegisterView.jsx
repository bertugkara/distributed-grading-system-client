import {useEffect} from "react";
import generatePassword from "../generateRandomPassword";
import './Register.css'
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const theme = createTheme();
export default function RegisterView(props) {

    useEffect(() => {
        props.setPassword(generatePassword());
    }, [props.registerType]);


    return <div>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'black',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        Register {props.registerType}
                    </Typography>
                    <Typography component="h5" variant="h7">
                        {props.registerType === "TEACHER" ? "Remember, Creating Teacher Will Create Expert As Well!" : null}
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="username"
                            name="username"
                            autoComplete="username"
                            onChange={(e) => {
                                props.setUsername(e.target.value)
                            }}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="email"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => {
                                props.setEmail(e.target.value)
                            }}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            disabled={true}
                            name="password"
                            label={"Password: " + props.password}
                            type="password"
                            id="password"
                            contentEditable={false}
                            autoComplete="current-password"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="firstName"
                            label="First Name"
                            placeholder="Abcdefg"
                            type="name"
                            id="name"
                            autoComplete="name"
                            onChange={(e) => {
                                props.setFirstName(e.target.value)
                            }}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lastName"
                            placeholder="Abcdefg"
                            label="Last Name"
                            type="lastName"
                            id="lastName"
                            autoComplete="lastname"
                            onChange={(e) => {
                                props.setLastName(e.target.value)
                            }}

                        />
                        <Button className={"register-button"}
                                onClick={() => {
                                    props.sendRequest();
                                }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    </div>
}