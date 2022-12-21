import {Box} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import "../UserList.css"

export default function InactiveListView(props){

    const columns = [
        {field: 'id', headerName: 'ID', width: 120},
        {field: 'firstName', headerName: 'Name', width: 200},
        {field: 'email', headerName: 'Surname', width: 200},
        {field: 'lastName', headerName: 'Surname', width: 200},
        {field: 'role', headerName: 'Role', width: 150},
        {
            field: "Activate Student",
            renderCell: (cellValues) => {
                return (
                    <Button className={"active-button"}
                            variant="contained"
                            onClick={() => { props.handleMakeStudentActive(cellValues.id)}}
                    >
                        Activate!
                    </Button>
                );
            }
            ,width: 150 }
    ];


    return <div>
        <Box sx={{height: 750, width: '100%'}}>
            <DataGrid
                rows={props.students}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    </div>
}