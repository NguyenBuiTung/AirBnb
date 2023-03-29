import { createSlice } from "@reduxjs/toolkit";
import { ACCESSTOKEN, http, settings } from "../../util/config";

const initialState = {
  userLogin: [],
  listRoom: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getReducerLoginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getListRoomAction: (state, action) => {
      state.listRoom = action.payload;
    },
  },
});

export const { getReducerLoginAction, getListRoomAction } = userReducer.actions;
export default userReducer.reducer;
export const loginApi = (user) => {
  console.log(user);
  return async (dispatch) => {
    const result = await http.post("/api/auth/signin", user);
    const action = getReducerLoginAction(result.data.content);
    dispatch(action);
    settings.setCookie(ACCESSTOKEN, result.data.content.token, 1 / 24);
  };
};
export const getDataListRoomApi = () => {
  return async (dispatch) => {
    const result = await http.get("/api/phong-thue");
    const action = getListRoomAction(result.data.content);
    dispatch(action);
  };
};
