import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useContext, useState} from "react";
import CommentByStudent from "./CommentByStudent";
import AuthenticationContext from "../../../../context/AuthenticationContext";

export default function OpenDialogStudentSubmission(props) {

    const {accountType} = useContext(AuthenticationContext)

    const handleSetGrade = (e) => {
        props.setGrade(e.target.value);
    }

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Remember, you are about to set Score, that can be undone!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Score"
                        label="Score"
                        type="Score"
                        fullWidth
                        variant="standard"
                        onChange={handleSetGrade}
                    />
                </DialogContent>
                {accountType === "STUDENT" ?
                    < CommentByStudent comment={props.comment} setComment={props.setComment}/>:null
                }
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={props.handleCloseAndSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}