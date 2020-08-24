import { useEffect, useContext, useState } from "react";
import Router from "next/router";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Components
import UserCard from "./UserCard";
import Industry from "./Industry";
// Contexts
import { UserContext } from "../../../contexts/UserContext";
// Utils
import { editPost } from "./utils/editPost";
import { deletePost } from "./utils/deletePost";

// Hooks
import useWidth from "../../../hooks/useWidth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    marginTop: 20,
    marginBottom: 75,
    width: "100%",
    overflowX: "hidden",
  },

  textField: {
    width: "17rem",
    marginTop: 20,
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: "Open Sans, sans serif",
  },
  innerWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  header: {
    textAlign: "center",
    marginBottom: 35,
    fontSize: 48,
    fontWeight: 500,
    fontFamily: "Open Sans, sans serif",
    width: "90vw",
  },
  text: {
    textAlign: "center",
    width: "90vw",
    margin: 5,
    fontWeight: 300,
    fontSize: 22,

    fontFamily: "Open Sans, sans serif",
  },

  button: {
    textTransform: "none",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    width: "45%",
    fontFamily: "Open Sans, sans serif",
  },
  logo: {
    width: 100,
    height: "auto",
  },
  nfb: {
    width: 100,
    height: "auto",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: 50,
    overflowX: "hidden",
    width: "100%",
  },
  info: {
    textAlign: "center",
    marginBottom: 25,
    marginTop: 50,
    fontSize: 18,
    fontWeight: 500,
    fontFamily: "Poppins, serif",
    color: "black",
  },
  buttonWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 35,
  },
}));

const Main = ({ handleClose, post }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(post.text);
  const [tags, setTags] = useState(post.tags);
  const { user } = useContext(UserContext);

  console.log(post);

  const onSubmit = async (text) => {
    setLoading(true);

    let id = post._id;

    let update = {
      text: text,
      author: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        photo: user.photo,
      },
      likes: post.likes,
      tags: tags,
    };

    await editPost(update, id).then((response) => {
      console.log(response);
      if (response.status === "success") {
        setLoading(false);
        Router.push(`/profiles/${user._id}`);
      } else {
        setLoading(false);
      }
    });
  };

  const onDelete = async () => {
    setLoading(true);

    let id = post._id;

    await deletePost(id).then((response) => {
      console.log(response);
      if (response.status === "success") {
        setLoading(false);
        Router.push(`/`);
      } else {
        setLoading(false);
      }
    });
  };

  // TODO : Replace with HOC ( I really mean Hook! ) functionality ...

  //   useEffect(() => {
  //     console.log(user);
  //   }, [width]);

  return (
    <div className={classes.root}>
      <div className={classes.innerWrapper}>
        <UserCard user={user} />
        <TextField
          multiline
          rows={4}
          className={classes.textField}
          variant="outlined"
          type="text"
          label="Post"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Industry tags={tags} setTags={setTags} />
        {/* need to change to display current tags component */}
        <div className={classes.buttonWrapper}>
          <Button
            disabled={text.length === 0}
            variant={"outlined"}
            color={"primary"}
            className={classes.button}
            onClick={() => onSubmit(text)}
          >
            Update
          </Button>
          <Button
            variant={"outlined"}
            color={"primary"}
            className={classes.button}
            onClick={() => onDelete()}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
