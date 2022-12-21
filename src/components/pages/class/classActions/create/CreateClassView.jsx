import {useState} from "react";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export default function CreateClassView(props) {

    const [selectedInstructorList, setSelectedInstructorList] = useState([]);
    const [selectedExpertList, setSelectedExpertList] = useState([]);
    const [selectedStudentList, setSelectedStudentList] = useState([]);

    const handleChangeTeacher = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedInstructorList(
            value
        );
    };
    const handleChangeExpert = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedExpertList(
            value
        );
    };

    const handleChangeStudent = (event) => {
        const {
            target: {value},
        } = event;
        setSelectedStudentList(
            value
        );
    };

    const handleClick = () => {
        props.callSubmit(selectedInstructorList,
            selectedExpertList,
            selectedStudentList)

        setSelectedInstructorList([])
        setSelectedExpertList([])
        setSelectedStudentList([])

    }

    return <div>
        <Container>
            <Typography component="h4" variant="h5">
                Create Class
            </Typography>

            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    border: 'black',
                    alignItems: 'center',
                }}
            >
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        id="className"
                        fullWidth
                        label="Class Name"
                        name="className"
                        autoComplete="className"
                        onChange={(e) => {
                            props.setName(e.target.value)
                        }}
                        autoFocus
                    />
                    <br></br>

                    <TextField
                        margin="normal"
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        fullWidth
                        onChange={(e) => {
                            props.setDescription(e.target.value)
                        }}
                        autoFocus
                    />
                    <br></br>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lessonCode"
                        label="Lesson Code"
                        name="lessonCode"
                        autoComplete="lessonCode"
                        onChange={(e) => {
                            props.setLessonCode(e.target.value)
                        }}
                        autoFocus
                    />

                    <br></br>

                    <FormControl sx={{width: 500, marginTop: 2}}>
                        <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            fullWidth
                            defaultValue={[]}
                            value={selectedInstructorList}
                            onChange={handleChangeTeacher}
                            label="Teacher"
                        >
                            {props.instructorList.map((teacher) => (
                                <MenuItem key={teacher.id} value={teacher.id}>
                                    {teacher.firstName + " " + teacher.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <div>
                        <FormControl sx={{width: 500, marginTop: 2}}>
                            <InputLabel id="demo-multiple-name-label">Experts</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                fullWidth
                                defaultValue={[]}
                                value={selectedExpertList}
                                onChange={handleChangeExpert}
                                input={<OutlinedInput label="Experts"/>}
                                MenuProps={MenuProps}
                            >
                                {props.expertList.map((expert) => (
                                    <MenuItem key={expert.id} value={expert.id}>
                                        {expert.firstName + " " + expert.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <FormControl sx={{width: 500, marginTop: 2}}>
                            <InputLabel id="demo-multiple-name-label">Students</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                fullWidth
                                defaultValue={[]}
                                value={selectedStudentList}
                                onChange={handleChangeStudent}
                                input={<OutlinedInput label="Students"/>}
                                MenuProps={MenuProps}
                            >
                                {props.studentList.map((student) => (
                                    <MenuItem key={student.id} value={student.id}>
                                        {student.firstName + " " + student.lastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </Box>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                        handleClick()
                    }}
                >
                    Submit
                </Button>

            </Box>

        </Container>
    </div>
}