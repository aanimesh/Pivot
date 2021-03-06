import { useState, useEffect, useContext } from "react";
// Material UI
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from "@material-ui/icons/Public";
import RoomIcon from "@material-ui/icons/Room";
// Components
import Image from "./Image";
// Context
import { ModalContext } from "../../../contexts/ModalContext";

function Preview({ data, story }) {
  const useStyles = makeStyles((theme) => ({
    card: {
      display: "flex",
      minHeight: 400,
      maxHeight: 400,
      minWidth: 300,
      maxWidth: 300,
      borderRadius: 0,
      boxShadow: "none",
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 1,
    },

    innerWrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      flexWrap: "wrap",
      padding: 0,
    },

    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
    },

    contentInnerWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },

    title: {
      textDecoration: "none",
      color: "black",
      fontFamily: "Noto Sans, sans serif",
      fontSize: 18,
      textAlign: "left",
      fontWeight: 700,
      margin: 0,
      padding: 0,
      width: "90%",
    },

    details: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      marginBottom: 5,
      marginTop: 10,
    },
    author: {
      color: "black",
      fontFamily: "Noto Sans, sans serif",
      fontWeight: 700,
      fontSize: 12,
      color: "grey",

      margin: 0,
    },
    date: {
      color: "black",
      fontFamily: "Frank Ruhl Libre, serif",
      fontWeight: 500,
      fontSize: "14px",
      margin: 0,
    },
    description: {
      textDecoration: "none",
      color: "black",
      fontFamily: "Frank Ruhl Libre, serif",
      fontWeight: 300,
      fontSize: "14px",
      maxWidth: "90%",
      marginTop: 30,
    },
    chip: {
      marginRight: theme.spacing(1),
      fontSize: 8,
      marginBottom: 10,
      fontFamily: "Open Sans, sans serif",
      fontWeight: 700,
      backgroundColor: "#E5E5E5",
      "&:hover": {
        opacity: 0.5,
        cursor: "pointer",
      },
    },
    chipArray: {
      display: "flex",
      flexWrap: "wrap",
      maxWidth: 300,
      marginTop: 10,
    },
  }));

  const classes = useStyles();

  useEffect(() => {}, [story, data]);

  if (story) {
    return (
      <Card className={classes.card}>
        <CardContent className={classes.innerWrapper}>
          <Image story={story} />
          <div className={classes.content}>
            <div className={classes.contentInnerWrapper}>
              <div className={classes.details}>
                <h1 className={classes.title}>{story.business}</h1>
              </div>
              <h2 className={classes.author}>
                {story.firstname} {story.lastname}
              </h2>
              <div className={classes.chipArray}>
                {story.location ? (
                  <Chip
                    size="small"
                    icon={<RoomIcon />}
                    label={story.location}
                    className={classes.chip}
                  />
                ) : null}
                {story.website ? (
                  <a
                    style={{ textDecoration: "none" }}
                    href={"https://" + story.website}
                    target="_blank"
                  >
                    <Chip
                      size="small"
                      icon={<PublicIcon />}
                      label={story.website}
                      className={classes.chip}
                    />
                  </a>
                ) : null}
                {story.industry ? (
                  <Chip
                    label={story.industry}
                    size="small"
                    className={classes.chip}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
}

export default Preview;
