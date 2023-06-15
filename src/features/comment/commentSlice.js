import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { COMMENTS_PER_POST } from "../../app/config";
import { toast } from "react-toastify";
import { getCurrentUserProfile } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},
  commentsByPost: {},
  currentPageByPost: {},
  totalCommentsByPost: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { comments, count } = action.payload.data;
      const { postId, page } = action.payload;

      comments.forEach(
        (comment) => (state.commentsById[comment._id] = comment)
      );
      state.commentsByPost[postId] = comments
        .map((comment) => comment._id)
        .reverse();
      state.totalCommentsByPost[postId] = count;
      state.currentPageByPost[postId] = page;
    },
    sendCommentReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, reactions } = action.payload;
      state.commentsById[commentId].reactions = reactions;
    },
    editCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // console.log("Edit--------", action.payload);
      const { _id, content } = action.payload.data;
      state.commentsById[_id].content = content;
    },

    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // console.log("Delele--------", action.payload);
      const { _id, post } = action.payload.data;
      state.commentsByPost[post] = state.commentsByPost[post].filter(
        (commentId) => commentId !== _id
      );
      state.totalCommentsByPost[post] = state.commentsByPost[post].length;
    },
  },
});

export default slice.reducer;

export const createComment =
  ({ postId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        content,
        postId,
      });
      dispatch(slice.actions.createCommentSuccess(response.data));
      dispatch(getComments({ postId })); //Refresh trang sau khi comment thanfh coong
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getComments =
  ({ postId, page = 1, limit = COMMENTS_PER_POST }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page: page, limit: limit };
      const response = await apiService.get(`posts/${postId}/comments`, {
        params,
      });
      dispatch(
        slice.actions.getCommentSuccess({
          ...response.data,
          postId,
          page,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sendCommentReaction =
  ({ commentId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Comment",
        targetId: commentId,
        emoji,
      });
      dispatch(
        slice.actions.sendCommentReactionSuccess({
          commentId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const editComment =
  ({ commentId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comments/${commentId}`, {
        content,
      });

      dispatch(slice.actions.editCommentSuccess(response.data));
      toast.success("Comment edited successfully");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteComment =
  ({ commentId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/comments/${commentId}`);

      console.log("response", response);
      dispatch(slice.actions.deleteCommentSuccess(response.data));
      toast.success("Comment deleted successfully");
      dispatch(getCurrentUserProfile());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
