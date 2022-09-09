import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
         professionsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }

    }
});

const { actions, reducer: professionsReducer } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequestFiled } = actions;

export function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
dispatch(professionsRequested());
        try {
           const { content } = await professionService.get();
           dispatch(professionsReceved(content));
        } catch (error) {
            dispatch(professionsRequestFiled(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;

// export const getProfessionsByIds = (professionsIds) => (state) => {
//  if (state.professions.entities) {
//     const newProfessionsArray = [];
//     for (const profId of professionsIds) {
//         for (const profession of state.professions.entities) {
//             if (profession._id === profId) {
//                 newProfessionsArray.push(profession);
//                 break;
//             }
//         }
//     }
//     return newProfessionsArray;
//  }
// };

 export const getProfession = (id) => (state) => {
        return state.professions.entities.find((p) => p._id === id);
    };

export default professionsReducer;
