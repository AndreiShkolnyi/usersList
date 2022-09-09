import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";
import { randomInt } from "../utils/randomInt";

const initialState = localStorageService.getAccessToken()
? {
 entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLogedIn: true,
        dataLoaded: false
}
: {
 entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLogedIn: false,
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
            state.isLogedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userUpdateSuccessed: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.auth = null;
            state.isLogedIn = false;
            state.dataLoaded = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { actions, reducer: usersReducer } = usersSlice;
const {
    usersRequested,
     usersReceved,
      usersRequestFiled,
       authRequestSuccess,
        authRequestFailed,
        userCreated,
        userUpdateSuccessed,
        userLoggedOut
} = actions;
const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/createUserFailed");
const userUpdateFailed = createAction("user/userUpdateFailed");
const userUpdateRequested = createAction("user/userUpdateRequested");

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { password, email } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.logIn({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
         localStorageService.setTokens(data);
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
             dispatch(authRequestFailed(errorMessage));
        } else {
             dispatch(authRequestFailed(error.message));
        }
    }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
    const data = await authService.register({ email, password });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.localId }));
    dispatch(createUser({
 _id: data.localId,
         email,
          rate: randomInt(1, 5),
           completedMeetings: randomInt(0, 200),
           image: `https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`,
            ...rest
}));
} catch (error) {
    dispatch(authRequestFailed(error.message));
}
};

export const logOut = () => (dispatch) => {
localStorageService.removeAuthData();
dispatch(userLoggedOut());
history.push("/");
};

function createUser(payload) {
return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
        const { content } = await userService.create(payload);
   dispatch(userCreated(content));
   history.push("/users");
    } catch (error) {
        dispatch(createUserFailed(error.message));
    }
};
}
export const updateUserData = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
    const { content } = await userService.update(payload);
    dispatch(userUpdateSuccessed(content));
    history.push(`/users/${content._id}`);
} catch (error) {
    dispatch(userUpdateFailed(error.message));
}
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
        try {
           const { content } = await userService.get();
           dispatch(usersReceved(content));
        } catch (error) {
            dispatch(usersRequestFiled(error.message));
        }
};

export const getUsersList = () => (state) => {
    return state.users.entities;
};
export const getCurrentUserData = () => (state) => {
  return state.users.entities
? state.users.entities.find((u) => u._id === state.users.auth.userId)
: null;
};

export const getUserById = (userId) => (state) => {
        if (state.users.entities) {
            return state.users.entities.find((user) => user._id === userId);
        }
    };
export const getIsLogedIn = () => (state) => state.users.isLogedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersIsLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => {
return state.users.error;
};

export default usersReducer;
