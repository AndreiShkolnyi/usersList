import { IComment } from "./../types/types";
import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { AppDispatch } from "./createStore";

interface commentsState {
    entities: null | any;
    isLoading: boolean;
    error: null | any;
}

const initialState: commentsState = {
    entities: null,
    isLoading: true,
    error: null
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
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
        commetnCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c: IComment) => c._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
    commetnCreated,
    commentRemoved
} = actions;

const addCommentRequested = createAction("comments/addCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const loadCommentsList =
    (userId: string) => async (dispatch: AppDispatch) => {
        dispatch(commentsRequested());
        try {
            const { content } = await commentService.getComments(userId);
            dispatch(commentsReceved(content));
        } catch (error) {
            dispatch(commentsRequestFiled(error));
        }
    };
export const createComment =
    (payload: any) => async (dispatch: AppDispatch, getState: any) => {
        dispatch(addCommentRequested());
        try {
            const { content } = await commentService.createComment(payload);
            dispatch(commetnCreated(content));
        } catch (error) {
            dispatch(commentsRequestFiled(error));
        }
    };
export const removeComment =
    (commentId: string) => async (dispatch: AppDispatch) => {
        dispatch(removeCommentRequested());
        try {
            const { content } = await commentService.removeComment(commentId);
            if (!content) {
                dispatch(commentRemoved(commentId));
            }
        } catch (error) {
            dispatch(commentsRequestFiled(error));
        }
    };

export const getComments = () => (state: { comments: { entities: any } }) =>
    state.comments.entities;
export const getCommentsLoadingStatus =
    () => (state: { comments: { isLoading: any } }) =>
        state.comments.isLoading;

export default commentsReducer;
