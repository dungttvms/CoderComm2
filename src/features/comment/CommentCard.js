import React, { useState } from "react";
import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { fDate } from "../../ultis/formatTime";
import CommentReaction from "./CommentReaction";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentEditForm from "./CommentEditForm";
import ConfirmCommentDelete from "./ConfirmCommentDelete";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment }) {
  const dispatch = useDispatch();
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [isCommentDelete, setIsCommentDelete] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMoreVertIconOpen = Boolean(anchorEl);

  const handleMoreVertIconOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreVertIconClose = () => {
    setAnchorEl(null);
  };

  const handleCommentEdit = () => {
    handleMoreVertIconClose();

    setIsCommentEdit(true);
  };

  const handleCommentDelete = async (commentId) => {
    setIsCommentDelete(false);
    dispatch(deleteComment({ commentId }));
  };

  const menuId = "more-card-options-menu";
  const renderMoreOptions = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMoreVertIconOpen}
      onClose={handleMoreVertIconClose}
    >
      <MenuItem onClick={handleCommentEdit} sx={{ mx: 1 }}>
        Edit
      </MenuItem>

      <MenuItem
        onClick={() => {
          setIsCommentDelete(true);
          handleMoreVertIconClose();
        }}
        sx={{ mx: 1 }}
      >
        Delete
      </MenuItem>
    </Menu>
  );

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "right" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(comment.createdAt)}
          </Typography>

          <IconButton>
            <MoreVertIcon
              sx={{ fontSize: 30 }}
              onClick={handleMoreVertIconOpen}
            />
          </IconButton>
        </Stack>

        {renderMoreOptions}

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>

        {isCommentEdit && (
          <CommentEditForm
            commentId={comment._id}
            setIsCommentEdit={setIsCommentEdit}
          />
        )}

        {isCommentDelete && (
          <ConfirmCommentDelete
            commentId={comment._id}
            setIsCommentDelete={setIsCommentDelete}
            handleCommentDelete={handleCommentDelete}
          />
        )}
      </Paper>
    </Stack>
  );
}

export default CommentCard;
