import { createSlice } from "@reduxjs/toolkit";

export const mylist = createSlice({
    name: "mylist",
    initialState: [],
    reducers: {
        savePokemon: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removePokemon: (state, action) => {
            state.splice(action.payload, 1);
            return state;
        },
    }
});

export const {savePokemon, removePokemon} = mylist.actions;
export default mylist.reducer;