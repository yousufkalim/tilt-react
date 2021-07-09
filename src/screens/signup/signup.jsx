import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Joi from "joi-browser";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import SignupForm from "./../components/auth/signupForm";
import LoginForm from "./loginForm";
import { Logo } from "../../images/images";
// import * as userService from "../services/userService";
import auth from "../../services/authService";
import { toast } from "react-toastify";
import { UpdateStore, Store } from "../../context/StoreContext";
import "../../styles/signup.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    overflowX: "hidden",
    height: "100vh",
    textAlign: "center",
  },
  signInInfo: {
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundImage: `url(${BackgroundWithShapes})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  welcome: {
    fontWeight: 900,
    marginBottom: 20,
  },
  info: {
    paddingLeft: "50px",
    paddingRight: "50px",
    marginBottom: "30px",
  },
  formHeading: { color: "#d10248" },
});

const Signup = () => {
  const classes = useStyles();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneCode: "",
    phoneNumber: "",
    day: "",
    month: "",
    year: "",
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [formType, setFormType] = useState("signin");
  const history = useHistory();
  const updateStore = UpdateStore();
  const { user: currentUser } = Store();

  // useEffect(() => {
  //   console.log("currentUser", currentUser);
  // });

  const registerSchema = {
    name: Joi.string().min(5).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    confirmPassword: Joi.string().required().min(5).label("Password"),
    phoneCode: Joi.string()
      .regex(/^[+][0-9][0-9]/)
      .required()
      .min(3)
      .max(3)
      .label("Phone Code"),
    phoneNumber: Joi.number().required().label("Phone Number"),
    day: Joi.string()
      .regex(/^[0-9]/)
      .min(1)
      .max(2)
      .required()
      .label("Day"),
    month: Joi.string()
      .regex(/^[0-9]/)
      .min(1)
      .max(2)
      .required()
      .label("Month"),
    year: Joi.string()
      .regex(/^[0-9]/)
      .min(4)
      .max(4)
      .required()
      .label("Year"),
  };

  const loginSchema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: formType === "signup" ? registerSchema[name] : loginSchema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleLoginFormChange = ({ target }) => {
    const { name, value } = target;
    const allErrors = { ...loginErrors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) allErrors[name] = errorMessage;
    else delete allErrors[name];
    setLoginErrors(allErrors);

    const formData = { ...loginData };
    formData[name] = value;
    setLoginData(formData);
  };

  const handleFormType = () => {
    if (formType === "signup") {
      setFormType("signin");
      setRegisterData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneCode: "",
        phoneNumber: "",
        day: "",
        month: "",
        year: "",
      });
      setRegisterErrors({});
    } else {
      setFormType("signup");
      setLoginData({ email: "", password: "" });
      setLoginErrors({});
    }
  };

  const validate = () => {
    const options = { abortEarly: false };
    let errors = {};
    if (formType === "signup") {
      const result = Joi.validate(registerData, registerSchema, options);
      if (!result.error) return null;
      for (let item of result.error.details) {
        errors[item.path] = item.message;
      }
    } else {
      const result = Joi.validate(loginData, loginSchema, options);
      if (!result.error) return null;
      for (let item of result.error.details) {
        errors[item.path] = item.message;
      }
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = validate();
    if (formType === "signup") {
      setRegisterErrors(errors || {});
      if (!errors && registerData.password !== registerData.confirmPassword) {
        errors = {
          password: "Password does not match",
          confirmPassword: "Password does not match",
        };
        setRegisterErrors(errors);
      }
    } else {
      setLoginErrors(errors || {});
    }
    if (errors) return;

    if (formType === "signup") console.log("Submitted");
    else loginUser();
  };

  const loginUser = async () => {
    try {
      const { email, password } = loginData;
      const data = await auth.login(email, password);
      localStorage.setItem("token", `Bearer ${data.token}`);
      updateStore({ user: data.user, token: data.token });
      history.replace("/menu");
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={6} xs={12} zeroMinWidth>
          <div className="background">
            <div className={classes.signInInfo}>
              <Typography variant="h2" className={classes.welcome}>
                <Link to="/">
                  <img src={Logo} alt="" width="240" />
                </Link>
                <br />
                <br />
                {formType === "signup" ? "WELCOME !" : ""}
                {formType === "signin" ? "HELLO !" : ""}
              </Typography>
              <Typography variant="subtitle2" className={classes.info}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                blanditiis iste magni sapiente autem nemo minima reprehenderit
                illo assumenda eveniet.
              </Typography>
              <button className="signInBtn" onClick={handleFormType}>
                {formType === "signup" ? "Sign In" : ""}
                {formType === "signin" ? "Sign Up" : ""}
              </button>
            </div>
          </div>
        </Grid>
        <Grid item md={6} xs={12} zeroMinWidth>
          <div className="signupForm">
            {formType === "signup" ? (
              <>
                <Typography variant="h2" className={classes.formHeading}>
                  Create Account
                </Typography>
                {/* <SignupForm
                  handleFormChange={handleRegisterFormChange}
                  handleFormSubmit={handleSubmit}
                  errors={registerErrors}
                  data={registerData}
                /> */}
              </>
            ) : formType === "signin" ? (
              <>
                <Typography variant="h2" className={classes.formHeading}>
                  Login
                </Typography>
                <LoginForm
                  handleFormChange={handleLoginFormChange}
                  handleFormSubmit={handleSubmit}
                  errors={loginErrors}
                  data={loginData}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
