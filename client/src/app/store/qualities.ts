import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qaulity.service";
import isOutdated from "../utils/isOutdated";
import { AppDispatch } from "./createStore";

interface QualitiesState {
    entities: null;
    isLoading: boolean;
    error: null;
    lastFetch: null | number;
}

const initialState: QualitiesState = {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
};

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState,
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions;

export const loadQualitiesList =
    () => async (dispatch: AppDispatch, getState: any) => {
        const { lastFetch } = getState().qualities;
        if (isOutdated(lastFetch)) {
            dispatch(qualitiesRequested());
            try {
                const { content } = await qualityService.fetchAll();
                dispatch(qualitiesReceved(content));
            } catch (error) {
                dispatch(qualitiesRequestFiled(error));
            }
        }
    };

export const getQualities = () => (state: any) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state: any) =>
    state.qualities.isLoading;
export const getQulitiesByIds = (qualitiesIds: any) => (state: any) => {
    if (state.qualities.entities) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of state.qualities.entities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    return [];
};

export default qualitiesReducer;
