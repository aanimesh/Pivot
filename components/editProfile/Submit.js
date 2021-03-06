import { useEffect, useState, useContext } from "react";
import Router from "next/router";
import Cookie from "js-cookie";
// Validation
import { validateDetails } from "../../utils/validation/validateDetails";
import { incrementForm } from "../../utils/validation/incrementForm";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// Components
// Contexts
import { UserContext } from "../../contexts/UserContext";
import { CarouselContext } from "../UI/Carousel/contexts/CarouselContext";
// Utils
import { authenticate } from "../../utils/authentication/authenticate";
import { signup } from "./utils/signup";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    padding: 35,
    borderRadius: 5,
  },
  textField: {
    width: "17rem",
    marginTop: "4rem",
    flexGrow: 1,
    flexShrink: 1,
  },
  innerWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    margin: 0,
    fontSize: 50,
    color: "white",
    fontWeight: 700,
    fontFamily: "Open Sans, sans-serif",
  },
  text: {
    textAlign: "center",
    margin: 25,
    color: "white",
    fontWeight: 500,
    fontSize: 22,
    fontFamily: "Open Sans, sans-serif",
  },
  email: {
    textAlign: "center",
    width: "17rem",
    margin: 0,
    marginTop: 30,
    fontWeight: 700,
    fontSize: 18,
    fontFamily: "Open Sans, sans-serif",
  },

  button: {
    marginTop: "3rem",
    marginBottom: "3rem",
  },
}));

function Submit({ values, submitting, setSubmitting }) {
  const { setUser, setAuthenticated, setToken } = useContext(UserContext);

  const { lastElement, index } = useContext(CarouselContext);
  const [error, setError] = useState({ value: false, message: "" });
  const data = {
    email: values.email,
    password: values.password,
    firstname: values.firstname,
    lastname: values.lastname,
    business: values.business,
    industry: values.industry,
    location: values.location,
    years: values.years,
    hasSite: values.hasSite,
    website: values.website,
    achievements: values.achievements,
    goals: values.goals,
    challenges: values.challenges,
    wish: values.wish,
  };

  const uploadImage = async (image, user) => {
    if (image) {
      const form_data = new FormData();
      form_data.append("upload", image, image.name);
      let res = await fetch(
        `http://localhost:5000/api/users/avatar/${user._id}`,
        {
          method: "PUT",
          body: form_data,
        }
      );
      let data = await res;
      console.log(data);
    }
  };

  const onSumbit = () => {
    setSubmitting(true);
    // NOTE : reroute to `/` upon sucessful login
    // TODO : configure functionality here for `persisted state` later on ...
    signup(data).then((response) => {
      console.log(response);
      // NOTE : check that response is successful
      if (response.status === "success") {
        authenticate({
          email: data.email,
          password: data.password,
        }).then(async (response) => {
          if (response.status === "success") {
            // NOTE : set `token`, `user`, `authenticated` state, in UserContext, upon sucessful login
            let token = response.data.token;
            let user = response.data.user;

            Cookie.set("token", token);
            setToken(token);
            setUser(user);
            setAuthenticated(true);

            console.log(response.data);
            Router.push(`/profiles/${user._id}`);
          } else {
            console.log(response);
            setError({ value: true, message: response.message });
            setToken(null);
            setAuthenticated(false);
            setSubmitting(false);
          }
        });
      } else {
        console.log(response);
        setError({ value: true, message: response.message });
        setSubmitting(false);
      }
    });
  };

  useEffect(() => {
    if (lastElement()) {
      onSumbit();
    }
  }, [index]);

  const classes = useStyles();

  if (submitting) {
    return (
      <div className={classes.root}>
        <div className={classes.innerWrapper}>
          <h1 className={classes.header}>Loading</h1>
          <p className={classes.text}>Just a Second!</p>
        </div>
      </div>
    );
  }

  if (error.value) {
    return (
      <div className={classes.root}>
        <div className={classes.innerWrapper}>
          <h1 className={classes.header}>Error</h1>
          <p className={classes.text}>{error.message}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Submit;
