import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { itemTypes } from "../../types/types";

interface stateTypes {
  allFetchedData: itemTypes[];
}

const initialState: stateTypes = {
  allFetchedData: [],
};

const dataControllerSlice = createSlice({
  name: "dataController",
  initialState,
  reducers: {
    getAllData: (state, action: PayloadAction<itemTypes[]>) => {
      state.allFetchedData = action.payload;
    },
  },
});

export const { getAllData } = dataControllerSlice.actions;
export default dataControllerSlice.reducer;
