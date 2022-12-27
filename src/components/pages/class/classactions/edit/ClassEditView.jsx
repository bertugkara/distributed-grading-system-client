import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import Button from "@mui/material/Button";

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

export default function ClassEditView(props) {

    const {tempStudentList,setTempStudentList,tempExpertList,setTempExpertList,tempTeacherList,setTempTeacherList} = props
    console.log(tempStudentList,tempExpertList,tempTeacherList)
    const handleChangeTeacher = (event) => {
        const {
            target: {value},
        } = event;
        setTempTeacherList(value);
    };
    const handleChangeExpert = (event) => {
        const {
            target: {value},
        } = event;
        setTempExpertList(value);
    };

    const handleChangeStudent = (event) => {
        const {
            target: {value},
        } = event;
        setTempStudentList(value);
    };

    function sendEditRequest() {
        props.sendEditRequest();
    }

    return <div className={"adminEditLesson"}>

        <div>
            <Box className={"edit-box"}
                 component="form"
                 sx={{
                     "& .MuiTextField-root": {m: 1, width: "25ch"},
                 }}
                 noValidate
                 autoComplete="off"
            >
                <div>
                    <h3>Please Edit The Boxes You want to Edit</h3>
                    <TextField
                        required
                        id="outlined-required"
                        label="Name Of The Class"
                        value={props.name}
                        onChange={(e) => props.setName(e.target.value)}
                    />
                    <br></br>
                    <TextField
                        required
                        id="outlined-multiline-flexible"
                        label="Description Of The Class"
                        multiline
                        value={props.description}
                        onChange={(e) => props.setDescription(e.target.value)}
                    />
                    <br></br>
                    <TextField
                        required
                        id="outlined-multiline-flexible"
                        label="Lesson Code"
                        multiline
                        value={props.lessonCode}
                        onChange={(e) => props.setLessonCode(e.target.value)}
                    />
                </div>
            </Box>
        </div>
        <br></br>
        {props.class.instructor != null ?
            <span>
        Current Professor is :{" "}
                {props.class.instructor.firstName +
                    " " +
                    props.class.instructor.lastName}
      </span>
            : null}
        <br></br>
        <FormControl sx={{m: 1, width: 300}}>
            <InputLabel id="demo-simple-select-label">Professor</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tempTeacherList}
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
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-name-label">Experts</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={tempExpertList}
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
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-multiple-name-label">Students</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={tempStudentList}
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

        <Button
            onClick={() => {
                sendEditRequest();
            }}
        >
            Submit Changes
        </Button>

    </div>
}
