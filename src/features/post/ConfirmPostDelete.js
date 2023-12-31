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

function ConfirmPostDelete({ handlePostDelete, setIsPostDelete, postId }) {
  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Confirm to delete</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton>
          <CloseIcon onClick={() => setIsPostDelete(false)} />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{`Are you sure?`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsPostDelete(false)}
        >
          No
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => handlePostDelete(postId)}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmPostDelete;
