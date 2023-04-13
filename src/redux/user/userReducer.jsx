import { createSlice } from "@reduxjs/toolkit";
import { ACCESSTOKEN, http, settings } from "../../util/config";

const initialState = {
  userLogin: [],
  userBoxRoom: [],
  profileUser: [],
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
    getDataProfileUser: (state, action) => {
      state.profileUser = action.payload;
    },
  },
});

export const {
  getReducerLoginAction,
  getDataUserBoxAction,
  getDataProfileUser,
} = userReducer.actions;
export default userReducer.reducer;
export const loginApi = (user) => {
  // console.log(user);
  return async (dispatch) => {
    const result = await http.post("/api/auth/signin", user);
    const action = getReducerLoginAction(result.data.content);
    dispatch(action);
    // const actionProfile = profileUserApi(user.id);
    // dispatch(actionProfile);
    settings.setCookie(ACCESSTOKEN, result.data.content.token, 1 / 24);
  };
};
export const boxRoomApi = (data) => {
  return async (dispatch) => {
    await http.post("/api/dat-phong", data);
  };
};
export const profileUserApi = (id) => {
  return async (dispatch) => {
    const result = await http.get(`/api/users/${id}`);
    const action = getDataProfileUser(result.data.content);
    dispatch(action);
  };
};
export const uploadApi = (img) => {
  return async (dispatch) => {
    const result = await http.post("/api/users/upload-avatar", img);
    const action = getDataProfileUser(result.data.content);
    dispatch(action);
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
export const deleteUserBoxApi = (item) => {
  return async (dispatch) => {
    await http.delete(`/api/dat-phong/${item.id}`);
    const action = userBoxRoomApi(item.maNguoiDung);
    dispatch(action);
  };
};
