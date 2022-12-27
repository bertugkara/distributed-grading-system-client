import {FormControl, FormLabel} from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import './HomeworkSubmissionList.css'

export default function CommentByStudent(props) {

    function handleOnChangeComment(event) {
        props.setComment(event.target.value);
    }

    return <div className={"comment-box"}>
        <FormControl fullWidth >
            <FormLabel>Your comment</FormLabel>
            <Textarea
                placeholder=" Write Your Comment (Optional) "
                minRows={3}
                value={props.comment}
                onChange={handleOnChangeComment}
            />
        </FormControl>
    </div>

        ;
}