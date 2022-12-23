import Typography from "@mui/material/Typography";
import './AddHomeworkView.css'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
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
export default function AddHomeworkView(props) {

    const handleChangeExpert = (event) => {
        const {
            target: {value},
        } = event;
        props.setTempExpert(value);
    };

    function isListAvailable(list) {
        if (list == undefined && list == null) {
            return false
        } else return true;
    }

    return <div>
        <Typography component="h4" variant="h4">Add Homework</Typography>

        <Box>
            <TextField
                required
                id="outlined-required"
                label="Description"
                value={props.description}
                onChange={(e) => props.setDescription(e.target.value)}
            />
            <br></br>
            Please Choose Start Day:
            <br/>
            <DatePicker
                value={props.selectedStartDay}
                onChange={props.setSelectedStartDay}
                inputPlaceholder="Select a Start Day"
                shouldHighlightWeekends
            />
            <br></br>

            Please Select Homework End Day:
            <br/>
            <DatePicker
                value={props.selectedEndDay}
                onChange={props.setSelectedEndDay}
                inputPlaceholder="Select a Start End Day"
                shouldHighlightWeekends
            />
            <br/>

            Please Choose Responsible Expert (If Exists):
            <br></br>

            <FormControl sx={{width: 300}}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={props.tempExpert}
                    value={props.tempExpert}
                    onChange={handleChangeExpert}
                    input={<OutlinedInput label="Experts"/>}
                    MenuProps={MenuProps}
                >
                    {isListAvailable(props.classInfo.expertList) == true ? props.classInfo.expertList.map((expert) => (
                        <MenuItem key={expert.id} value={expert.id}>
                            {expert.firstName + " " + expert.lastName}
                        </MenuItem>
                    )): null }
                </Select>

            </FormControl>
            <br></br>
            <div className={"Submit-Button"}>
                <Button onClick={() => {
                    props.handleSubmit()
                }}>
                    Submit
                </Button>
            </div>
        </Box>

    </div>
}