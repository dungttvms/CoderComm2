import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

function ConfirmCommentDelete({
  handleCommentDelete,
  setIsCommentDelete,
  commentId,
}) {
  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm to delete</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={() => setIsCommentDelete(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{`Are you sure ?`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsCommentDelete(false)}
        >
          No
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => handleCommentDelete(commentId)}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmCommentDelete;
