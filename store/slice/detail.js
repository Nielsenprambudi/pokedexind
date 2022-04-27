import { createSlice } from "@reduxjs/toolkit";

export const detail = createSlice({
    name: 'detail',
    initialState: {},
    reducers: {
        seeDetail: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const {seeDetail} = detail.actions;
export default detail.reducer;