import { useState } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// Components
import Modal from "../Edit/Modal";
import Image from "../../Profile/Overview/Image";
import Content from "../Content/Main";

const Card = ({ post }) => {
  const useStyles = makeStyles(() => ({
    card: {
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      border: "1px solid #cccccc",
      width: "100%",
      maxWidth: 500,
      padding: 20,
      marginBottom: 25,
    },
    wrapper: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      flexWrap: "wrap",
      padding: 0,
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  if (post) {
    return (
      <div className={classes.card}>
        <Modal open={open} setOpen={setOpen} post={post} />
        <div className={classes.wrapper}>
          <Image image={post.author.photo} size={55} />
          <Content post={post} setOpen={setOpen} />
        </div>
      </div>
    );
  }
};

export default Card;
