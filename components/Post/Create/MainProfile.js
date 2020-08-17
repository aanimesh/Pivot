import { useContext, useState, useEffect } from "react";
import Router from "next/router";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Components
import UserCard from "./UserCard";
import Industry from "./Industry";
import Dialog from "./Dialog";
import Tags from "./Tags";
import MicroLink from "../Content/MicroLink";

// Contexts
import { UserContext } from "../../../contexts/UserContext";
import { ModalContext } from "../../../contexts/ModalContext";

// Utils
import { createPost } from "./utils/createPost";
import { addChild } from "./utils/addChild";
// Hooks
import useWidth from "../../../hooks/useWidth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: 75,
    border: "1px solid #e0e0e0",
    borderRadius: 5,
    padding: 20,
    marginTop: 10,

    width: "100%",
    maxWidth: 650,
  },
  textField: {
    width: "100%",
    flexGrow: 1,
    flexShrink: 1,

    border: "none",
  },
  innerWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    backgroundColor: "white",
    borderRadius: 10,
  },
  cardWrapper: {
    display: "flex",

    alignItems: "start",
    backgroundColor: "white",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "white",

    marginLeft: 20,
    width: "75%",
  },
  innerinnerWrapper: {
    display: "flex",
    marginTop: 10,
    flexWrap: "wrap",

    justifyContent: "space-between",
    backgroundColor: "white",

    width: "80%",
  },
  button: {
    textTransform: "none",
    marginTop: 21,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 12,
    width: 80,
    height: 30,
    fontFamily: "Open Sans, sans serif",
  },
}));

const Main = ({ role, context }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);
  const { setShowCreate } = useContext(ModalContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(role);
    console.log(context);
  }, [role, link]);

  const onSubmit = async (text) => {
    setLoading(true);

    let post = {
      text: text,
      author: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        photo: user.photo,
      },
      tags: tags,
      role: role,
      context: context,
    };

    await createPost(post).then(async (response) => {
      if (response.status === "success") {
        let post = response.data;
        if (role === "child") {
          await addChild(context, post._id).then((response) => {
            console.log(response);
          });
        }
        // fetchPosts();
        setLoading(false);

        Router.reload();
      } else {
        setLoading(false);
      }
    });
  };

  const onChange = async (e) => {
    examineContent(e.target.value);

    // if (e.target.value.includes("#")) {
    //   console.log(e.target.value.split("#")[1]);
    //   setOpen(true);
    // }
  };

  const examineContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    var link = "";

    if (text.match(urlRegex) !== null) {
      link = text.match(urlRegex)[0];
      setLink(link);
    }

    if (link !== "") {
      setText(formatText(text));
    } else {
      setText(text);
    }
  };

  const formatText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    var formatted_text = text;

    if (text.match(urlRegex) !== null) {
      formatted_text = text.replace(text.match(urlRegex), "");
    }

    return formatted_text;
  };

  return (
    <div className={classes.root}>
      <Dialog open={open} setOpen={setOpen} />
      <div className={classes.innerWrapper}>
        <div className={classes.cardWrapper}>
          <UserCard user={user} />
          <div className={classes.inputWrapper}>
            <TextField
              multiline
              maxrows={4}
              className={classes.textField}
              type="text"
              label="What's on your mind?"
              value={text}
              onChange={(e) => {
                onChange(e);

                if (e.target.value.length > 0) {
                  setShow(true);
                } else {
                  setShow(false);
                }
              }}
            />
            <div
              style={{ display: show ? "flex" : "none" }}
              className={classes.innerinnerWrapper}
            >
              {link ? <MicroLink link={link} /> : null}
              <Tags tags={tags} setTags={setTags} />
              <Button
                disabled={text.length === 0}
                variant={"contained"}
                color={"primary"}
                className={classes.button}
                onClick={() => onSubmit(text)}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
