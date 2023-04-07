import { createSlice } from "@reduxjs/toolkit";
import { ACCESSTOKEN, http, settings } from "../../util/config";

const initialState = {
  userLogin: [],
  userBoxRoom: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getReducerLoginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getDataUserBoxAction: (state, action) => {
      state.userBoxRoom = action.payload;
    },
  },
});

export const { getReducerLoginAction, getDataUserBoxAction } =
  userReducer.actions;
export default userReducer.reducer;
export const loginApi = (user) => {
  // console.log(user);
  return async (dispatch) => {
    const result = await http.post("/api/auth/signin", user);
    const action = getReducerLoginAction(result.data.content);
    dispatch(action);
    settings.setCookie(ACCESSTOKEN, result.data.content.token, 1 / 24);
  };
};
export const boxRoomApi = (data) => {
  return async (dispatch) => {
    await http.post("/api/dat-phong", data);
  };
};
export const uploadApi = (img) => {
  console.log(img);
  return async (dispatch) => {
    await http.post("/api/users/upload-avatar", img);
    getReducerLoginAction();
  };
};
export const userBoxRoomApi = (maNguoiDung) => {
  return async (dispatch) => {
    const result = await http.get(
      `/api/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`
    );
    const action = getDataUserBoxAction(result.data.content);
    dispatch(action);
  };
};
export const deleteUserBoxApi = (id) => {
  return async (dispatch) => {
    await http.delete(`/api/dat-phong/${id}`);
    getDataUserBoxAction();
  };
};
