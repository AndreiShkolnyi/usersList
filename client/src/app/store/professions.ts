import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import { IProfession } from "../types/types";
import isOutdated from "../utils/isOutdated";
import { AppDispatch } from "./createStore";

interface ProfessionState {
    entities: any;
    isLoading: boolean;
    error: any;
    lastFetch: any;
}

const initialState: ProfessionState = {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
};

const professionsSlice = createSlice({
    name: "professions",
    initialState,
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

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequestFiled } =
    actions;

export const loadProfessionsList =
    () => async (dispatch: AppDispatch, getState: any) => {
        const { lastFetch } = getState().professions;
        if (isOutdated(lastFetch)) {
            dispatch(professionsRequested());
            try {
                const { content } = await professionService.get();
                dispatch(professionsReceved(content));
            } catch (error) {
                dispatch(professionsRequestFiled(error));
            }
        }
    };
export const getProfessions = () => (state: any) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state: any) =>
    state.professions.isLoading;
export const getProfessionbyId = (id: string) => (state: any) => {
    if (state.professions.entities) {
        return state.professions.entities.find(
            (p: IProfession) => p._id === id
        );
    }
};
export default professionsReducer;
