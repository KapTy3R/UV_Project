import {createSlice} from '@reduxjs/toolkit';

import {stages} from 'config';

import {initialState} from './state';

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setStage: (state, action) => {
            // @ts-ignore
            state.prevStage = stages[action.payload.stage].prevStage[action.payload.gameName];
            state.currentStage = action.payload.stage;
            // @ts-ignore
            state.pageTitle = stages[action.payload.stage].name[action.payload.gameName];
            window.scrollTo(0, 0);
        },
        setRootEnd: (state, action) => {
            console.log(action.payload);
            state.pageTitle = '';
            state.currentStage = 'startModal';
            state.prevStage = '';
        }
    }
});

export const rootReducer = rootSlice.reducer;

export const setStage = rootSlice.actions.setStage;
export const setRootEnd = rootSlice.actions.setRootEnd;