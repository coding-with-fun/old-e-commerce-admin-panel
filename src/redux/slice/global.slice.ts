import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

export interface IInitialData {
    fetchAdminList: boolean;
}

const initialState: IInitialData = {
    fetchAdminList: false,
};

const GlobalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        refetchAdminList: (state, action) => {
            state.fetchAdminList = action.payload;
        },
    },
});

export const { refetchAdminList } = GlobalSlice.actions;

export const global = (state: RootState): IInitialData => state.global;

export default GlobalSlice.reducer;
