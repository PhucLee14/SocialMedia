import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;
        },
        clearUserId: (state) => {
            state.id = null;
        },
    },
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;
