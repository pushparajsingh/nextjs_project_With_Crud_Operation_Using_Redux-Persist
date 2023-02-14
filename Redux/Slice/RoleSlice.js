import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleData: [
    { roleLabel: "Junior developer", roleKey: "4587" },
    { roleLabel: "Senior developer", roleKey: "4589" },
    { roleLabel: "Intern developer", roleKey: "4510" },
  ],
  updateRoleData: "",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    registerRoleData: (state, action) => {
      state.roleData.push(action.payload);
    },
    deleteRoleData: (state, action) => {
      state.roleData.splice(action.payload, 1);
    },
    getRoleData: (state, action) => {
      state.updateRoleData = action.payload;
    },
    updateRoleData: (state, action) => {
      state.roleData = action.payload;
    },
    resetRoleData: (state, action) => {
      state.updateRoleData = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  registerRoleData,
  deleteRoleData,
  getRoleData,
  updateRoleData,
  resetRoleData,
} = roleSlice.actions;

export default roleSlice.reducer;
//store take location with the help of roleSlice.reducer. In the form of default;
