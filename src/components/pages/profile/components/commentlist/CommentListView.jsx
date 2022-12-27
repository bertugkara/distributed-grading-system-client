import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";

export default function CommentListView(props) {

    const {comment} = props;
    let creator;

    if (comment.creatorStudent != null) {
        creator = comment.creatorStudent
    } else if (comment.creatorExpert != null) {
        creator = comment.creatorExpert
    } else if (comment.creatorTeacher != null) {
        creator = comment.creatorTeacher
    }

    return <div>
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Comments</DialogTitle>
            <DialogContent>
                <Box>
                    <Card sx={{
                        width: 500,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        display: "grid",
                        marginTop: 1
                    }}>
                        <CardContent>
                            Writer: {creator.email}
                        </CardContent>
                        <CardContent>
                            Comment: {comment.comment}
                        </CardContent>
                    </Card>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>

    </div>
}