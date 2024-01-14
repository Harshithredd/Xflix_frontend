import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import VideoForm from "./VideoForm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#414040 ",
    color: "white",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root ": {
    width: "100%",
  },
  "& .MuiFormControl-root": {
    margin: theme.spacing(1),
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
  },
  "& .MuiFormLabel-root": {
    color: "whitesmoke",
  },
  "& .MuiSelect-outlined ": {
    color: "whitesmoke",
  },
  "& .MuiFormHelperText-root": {
    color: "#1976d2",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

let defaultValues = {
  videoLink: "",
  imageLink: "",
  title: "",
  genre: "",
  contentRating: "Anyone",
  releaseDate: "",
};

export default function DialogButton(props) {
  const [values, setValues] = React.useState(defaultValues);

  const handelInputChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


  return (
    <div>
      <Button variant="contained" onClick={props.handleClickOpen}>
        <UploadIcon />
        Upload
      </Button>
      <BootstrapDialog onClose={props.handleClose} open={props.open}>
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={props.handleClose}
        >
          Upload Video
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <VideoForm handelInputChanges={handelInputChanges} setValues={setValues} values={values} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            onClick={() => props.postVideoUpload(values)}
          >
            Upload Video
          </Button>
          <Button autoFocus varient="outlined" onClick={props.handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
