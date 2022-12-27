import Button from "@mui/material/Button";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

export default function ClassListView(props) {

    function isEditButtonVisible() {
        if (props.accountType.includes("ADMIN")) return true
        else return false;
    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 120},
        {field: 'name', headerName: 'Name', width: 175},
        {field: 'lessonCode', headerName: 'Lesson Code', width: 175},
        {
            field: "Lesson Page", headerName: "Lesson Page",
            renderCell: (cellValues) => {
                return (
                    <Button className={"lessonPage-button"}
                            variant="contained"
                            onClick={() => {
                                props.handleLessonPageButton(cellValues.id)
                            }}
                    >
                        Lesson Page
                    </Button>
                );
            }
            , width: 125
        },
        {
            field: "Edit Lesson",
            renderCell: (cellValues) => {
                return (
                    <Button className={"Edit-Button"}
                            variant="contained"
                            disabled={!isEditButtonVisible}
                            onClick={() => {
                                props.handleEditButton(cellValues.id)
                            }}
                    >
                        Edit Lesson
                    </Button>
                );
            }
            , width: 125
        }
    ];

    return <div>
        <Box sx={{height: 650, width: 1200}}>
            {props.lessons !== null ?
                <DataGrid
                    rows={props.lessons}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                /> : null}
        </Box>
    </div>
}