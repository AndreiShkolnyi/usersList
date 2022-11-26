import React from "react";
import Comment from "./comment";
import { IComment } from "../../../types/types";

interface CommentsProps {
    comments: [IComment] | any[];
    onRemove: (id: string) => void;
}

const CommentsList = ({ comments, onRemove }: CommentsProps) => {
    return (
        <>
            {comments.map((comment) => (
                <Comment key={comment._id} {...comment} onRemove={onRemove} />
            ))}
        </>
    );
};

export default CommentsList;
