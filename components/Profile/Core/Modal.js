import { useEffect, useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
// Components
import Main from "./Main";
// Contexts
import { UserContext } from "../../../contexts/UserContext";
// Hooks
import useWidth from "../../../hooks/useWidth";
// Utils
import { sameUser } from "../utils/sameUser";

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  close: {
    width: "50px",
    height: "50px",
    marginTop: 1,
  },
  dialogActions: {
    zIndex: 2,
    justifyContent: "space-between",
    width: "100%",
    height: 65,
    backgroundColor: "white",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw",
  },
  header: {
    textDecoration: "none",
    color: "black",
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    textAlign: "center",
    margin: 0,
    marginLeft: 10,
    marginTop: 0,
  },
}));

const Modal = ({ open, setOpen, story }) => {
  const { user } = useContext(UserContext);
  const { width, setWidth } = useWidth();
  const classes = useStyles();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll="paper"
      open={open}
      fullWidth={true}
      className={classes.dialog}
      maxWidth={"lg"}
      onClose={handleClose}
    >
      <DialogActions className={classes.dialogActions}>
        <h2 className={classes.header}>
          {sameUser(user, story) ? "My Journey: " : null} {story.business}
        </h2>
        <IconButton className={classes.close} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogActions>
      {width > 800 ? <Main story={story} /> : null}
    </Dialog>
  );
};

export default Modal;