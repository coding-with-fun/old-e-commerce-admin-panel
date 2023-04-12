import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from '../store';

export interface IUser {
    _id?: string;
    name?: string;
    profilePicture?: string;
    email?: string;
    newEmail?: string;
    contactNumber?: string;
    isActive?: boolean;
}

export interface IInitialData {
    userDetails: IUser | undefined;
}

const initialState: IInitialData = {
    userDetails: undefined,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
    },
});

export const { setUserDetails } = UserSlice.actions;

export const user = (state: RootState): IInitialData => state.user;

export default UserSlice.reducer;
