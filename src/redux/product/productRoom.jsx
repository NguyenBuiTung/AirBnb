import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  listRoom: [],
  listRoomDetail: [],
  listCommentDetail: [],
};

const productRoom = createSlice({
  name: "productRoom",
  initialState,
  reducers: {
    getListRoomAction: (state, action) => {
      state.listRoom = action.payload;
    },
    getDataListRoomDetailAction: (state, action) => {
      state.listRoomDetail = action.payload;
    },
    getDataListCommentAction: (state, action) => {
      state.listCommentDetail = action.payload;
    },
  },
});

export const {
  getListRoomAction,
  getDataListRoomDetailAction,
  getDataListCommentAction,
} = productRoom.actions;

export default productRoom.reducer;
export const getDataListRoomApi = () => {
  return async (dispatch) => {
    const result = await http.get("/api/phong-thue");
    const action = getListRoomAction(result.data.content);
    dispatch(action);
  };
};
export const getDataAreaApi = (id) => {
  return async (dispatch) => {
    const result = await http.get(
      `/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`
    );
    const action = getListRoomAction(result.data.content);
    dispatch(action);
  };
};
export const getDataDetailApi = (id) => {
  return async (dispatch) => {
    const result = await http.get(`/api/phong-thue/${id}`);
    const action = getDataListRoomDetailAction(result.data.content);
    dispatch(action);
  };
};
export const getDataListCommentApi = (maPhong) => {
  return async (dispatch) => {
    const result = await http.get(
      `/api/binh-luan/lay-binh-luan-theo-phong/${maPhong}`
    );
    const action = getDataListCommentAction(result.data.content);
    dispatch(action);
  };
};
export const commentApi = (cmt) => {
  // console.log(cmt);
  return async (dispatch) => {
    await http.post("/api/binh-luan", cmt);
    const action = getDataListCommentApi(cmt.maPhong);
    dispatch(action);
  };
};
