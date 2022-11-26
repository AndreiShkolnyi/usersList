import { IUser } from "./../types/types";
import { AppDispatch } from "./createStore";
import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import history from "../utils/history";

interface loginProps {
    payload: any;
    redirect: any;
}

interface initialProps {
    entities: null | any;
    isLoading: boolean;
    error: null | any;
    auth: null | any;
    isLoggedIn: boolean;
    dataLoaded: boolean;
}

const initialState: initialProps = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex(
                    (u: { _id: any }) => u._id === action.payload._id
                )
            ] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    // usersRequestFiled,
    // authRequestFailed,
    authRequestSuccess,
    userLoggedOut,
    userUpdateSuccessed
} = actions;

const authRequested = createAction("users/authRequested");
// const userUpdateFailed = createAction("users/userUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");

export const login =
    ({ payload, redirect }: loginProps) =>
    async (dispatch: AppDispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            history.push(redirect);
        } catch (error) {
            // const { code, message } = error.response.data.error;
            // if (code === 400) {
            //     const errorMessage = generetaAuthError(message);
            //     dispatch(authRequestFailed(errorMessage));
            // } else {
            //     dispatch(authRequestFailed(error.message));
            // }
        }
    };

export const signUp = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push("/users");
    } catch (error) {
        // dispatch(authRequestFailed(error.message));
    }
};
export const logOut = () => (dispatch: AppDispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};
export const loadUsersList = () => async (dispatch: AppDispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        // dispatch(usersRequestFiled(error.message));
    }
};
export const updateUser = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdateSuccessed(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        // dispatch(userUpdateFailed(error));
    }
};

export const getUsersList = () => (state: any) => state.users.entities;
export const getCurrentUserData = () => (state: any) => {
    return state.users.entities
        ? state.users.entities.find(
              (u: IUser) => u._id === state.users.auth.userId
          )
        : null;
};
export const getUserById = (userId: string) => (state: any) => {
    if (state.users.entities) {
        return state.users.entities.find((u: IUser) => u._id === userId);
    }
};

export const getIsLoggedIn = () => (state: { users: { isLoggedIn: any } }) =>
    state.users.isLoggedIn;
export const getDataStatus = () => (state: { users: { dataLoaded: any } }) =>
    state.users.dataLoaded;
export const getUsersLoadingStatus =
    () => (state: { users: { isLoading: any } }) =>
        state.users.isLoading;
export const getCurrentUserId =
    () => (state: { users: { auth: { userId: any } } }) =>
        state.users.auth.userId;
export const getAuthErrors = () => (state: { users: { error: any } }) =>
    state.users.error;
export default usersReducer;
