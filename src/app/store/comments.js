import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { getCurrentUserId } from "./users";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        isDeleted: false,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
         commentsReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }

    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
 commentsRequested,
     commentsReceved,
      commentsRequestFiled,
    commentCreated,
    commentDeleted
 } = actions;

const addCommentRequested = createAction("commnets/addCommentRequested");
const deleteCommentRequested = createAction("comments/deleteCommentRequested");

export const loadCommentsList = (userId) => async (dispatch) => {
dispatch(commentsRequested());
        try {
           const { content } = await commentService.getComments(userId);
           dispatch(commentsReceved(content));
        } catch (error) {
            dispatch(commentsRequestFiled(error.message));
        }
    };

export const removeComment = (id) => async (dispatch, state) => {
    dispatch(deleteCommentRequested());
    try {
        const { content } = await commentService.deleteComments(id);
        if (content === null) {
             dispatch(commentDeleted(id));
        };
    } catch (error) {
         dispatch(commentsRequestFiled(error.message));
    }
};

export const createComment = (payload) => async (dispatch, getState) => {
   dispatch(addCommentRequested(payload));
   const comment = {
            ...payload,
            _id: nanoid(),
            created_at: Date.now(),
            userId: getCurrentUserId()(getState())

        };
    try {
         const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;
export default commentsReducer;
