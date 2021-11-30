import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Joi from "joi-browser";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import SignupForm from "./../components/auth/signupForm";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import AddCompanyForm from "./addCompany";
import { Logo } from "../../images/images";
import { register } from "../../services/userService";
import auth from "../../services/authService";
import { toast } from "react-toastify";
import { UpdateStore, Store } from "../../context/StoreContext";
import "../../styles/signup.css";
import { getAllCompanies } from "../../services/companyService";
import InputWithLabel from "../../Components/common/inputWithLabel";
import axios from "axios";
import { baseUrl } from "../../config";

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
    marginBottom: 70,
  },
  welcome2: {
    fontWeight: 900,
    marginBottom: 20,
  },
  info: {
    paddingLeft: "50px",
    paddingRight: "50px",
    marginBottom: "30px",
  },
  formHeading: { color: "#d10248" },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "none",
    borderRadius: "10px",
    minWidth: "400px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Signup = () => {
  const classes = useStyles();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    companyId: "",
    affiliate: "",
    terms: false,
  });
  const [companyData, setCompanyData] = useState({
    name: "",
    phone: "",
    deliveryPlace: "",
    street: "",
    city: "",
  });
  const [companies, setCompanies] = useState([]);
  const [registerErrors, setRegisterErrors] = useState({});
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [companyErrors, setCompanyErrors] = useState({});

  const [suggestedBy, setSuggestedBy] = useState();
  const [suggestedCompanyName, setSuggestedCompanyName] = useState("");
  const [suggestErrors, setSuggestErrors] = useState({});
  const [openSuggest, setOpenSuggest] = useState(false);
  const [formType, setFormType] = useState("signup");
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const updateStore = UpdateStore();
  const { user: currentUser } = Store();

  const handleClose = () => setOpenSuggest(false);

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    setSuggestedBy(registerData.email ? registerData.email : "");
  }, [registerData.email]);

  const getCompanies = async () => {
    const data = await getAllCompanies();
    setCompanies(data);
  };

  const registerSchema = {
    firstName: Joi.string()
      .min(4)
      .required()
      .label("Prénom")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    lastName: Joi.string()
      .min(4)
      .required()
      .label("Nom")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    email: Joi.string()
      .email()
      .required()
      .label("Email")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.email":
              err.message = `${err.context.label} doit être un email valide`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    confirmPassword: Joi.string()
      .required()
      .min(5)
      .label("Password")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    phone: Joi.string()
      .required()
      .length(10)
      .regex(/^((\+)33|0)[1-9](\d{2}){4}$/)
      .label("Numéro de Téléphone")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;

            case "string.length":
              err.message = `${err.context.label} doit comporter 10 caractères!`;
              break;

            case "string.regex.base":
              err.message = `${err.context.label} doit commencer par zéro!`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    companyId: Joi.string()
      .required()
      .label("Company")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    affiliate: Joi.string().allow("").label("Code affilie"),
    terms: Joi.required(),
  };

  const loginSchema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.email":
              err.message = `${err.context.label} doit être un email valide`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
    password: Joi.string()
      .required()
      .min(4)
      .label("Password")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  const suggestSchema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.email":
              err.message = `${err.context.label} doit être un email valide`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),
  };

  const companySchema = {
    name: Joi.string()
      .min(3)
      .required()
      .label("Nom")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    phone: Joi.string()
      .required()
      .length(10)
      .regex(/^((\+)33|0)[1-9](\d{2}){4}$/)
      .label("Numéro de Téléphone")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;

            case "string.length":
              err.message = `${err.context.label} doit comporter 10 caractères!`;
              break;

            case "string.regex.base":
              err.message = `${err.context.label} doit commencer par zéro!`;
              break;

            default:
              break;
          }
        });
        return errors;
      }),

    deliveryPlace: Joi.string()
      .min(3)
      .required()
      .label("Delivery Place")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    street: Joi.string()
      .min(3)
      .required()
      .label("Street")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            case "string.min":
              err.message = `${err.context.label} doit avoir au moins ${err.context.limit} Longs caractères!`;
              break;
            case "string.max":
              err.message = `${err.context.label} devrait avoir au plus ${err.context.limit} Longs caractères!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    city: Joi.string()
      .required()
      .label("City")
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "any.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };
  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]:
        formType === "none"
          ? companySchema[name]
          : formType === "signup"
          ? registerSchema[name]
          : loginSchema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const validateSuggest = (name, value) => {
    const obj = { [name]: value };
    const schema = {
      [name]: suggestSchema[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const handleRegisterFormChange = ({ target }) => {
    const { name, value, checked } = target;

    if (value === "suggest") {
      setOpenSuggest(true);
    } else {
      if (name === "phone") {
        if (value.length <= 10) {
          const allErrors = { ...registerErrors };
          const errorMessage = validateProperty(name, value);
          if (errorMessage) allErrors[name] = errorMessage;
          else delete allErrors[name];
          setRegisterErrors(allErrors);

          const formData = { ...registerData };
          formData[name] = value;
          setRegisterData(formData);
        }
      } else {
        const allErrors = { ...registerErrors };
        const errorMessage = validateProperty(name, value);
        if (errorMessage) allErrors[name] = errorMessage;
        else delete allErrors[name];
        setRegisterErrors(allErrors);

        const formData = { ...registerData };
        if (name === "terms") {
          formData[name] = checked;
        } else {
          formData[name] = value;
        }
        setRegisterData(formData);
      }
    }
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

  const handleCompanyFormChange = ({ target }) => {
    const { name, value } = target;
    const allErrors = { ...companyErrors };
    const errorMessage = validateProperty(name, value);
    if (errorMessage) allErrors[name] = errorMessage;
    else delete allErrors[name];
    setCompanyErrors(allErrors);
    const formData = { ...companyData };
    formData[name] = value;
    setCompanyData(formData);
  };

  const handleSuggestFormChange = ({ target }) => {
    const { name, value, checked } = target;
    const allErrors = { ...suggestErrors };
    const errorMessage = validateSuggest(name, value);
    if (errorMessage) allErrors[name] = errorMessage;
    else delete allErrors[name];
    setSuggestErrors(allErrors);
    setSuggestedBy(value);
  };

  const handleFormType = () => {
    if (formType === "signup") {
      setFormType("signin");
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        companyId: "",
        affiliate: "",
        terms: false,
      });
      setRegisterErrors({});
    } else {
      setFormType("signup");
      setLoginData({ email: "", password: "" });
      setLoginErrors({});
    }
  };

  const handleAddCompanyBtn = () => {
    setFormType("none");
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
    } else if (formType === "signin") {
      const result = Joi.validate(loginData, loginSchema, options);
      if (!result.error) return null;
      for (let item of result.error.details) {
        errors[item.path] = item.message;
      }
    } else {
      const result = Joi.validate(companyData, companySchema, options);
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
          password: "Le mot de passe ne correspond pas",
          confirmPassword: "Le mot de passe ne correspond pas",
        };
        setRegisterErrors(errors);
      } else if (!errors && !registerData.terms) {
        errors = {
          terms: "Les termes doivent être vérifiés",
        };
        setRegisterErrors(errors);
      }
    } else {
      setLoginErrors(errors || {});
    }
    if (errors) return;

    if (formType === "signup") registerUser();
    else loginUser();
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    let errors = validate();
    if (formType === "none") {
      if (errors) {
        setCompanyErrors(errors);
        return;
      }
    }
    addCompnay();
  };

  const handleSuggestSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    if (suggestErrors.email || suggestedCompanyName === "") {
      setDisable(false);
      return;
    } else {
      submitSuggestion();
    }
  };

  const registerUser = async () => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        companyId,
        affiliate,
      } = registerData;
      await register({
        firstName,
        lastName,
        email,
        password,
        phone,
        companyId,
        affiliate,
      });
      handleFormType();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const loginUser = async () => {
    try {
      const { email, password } = loginData;
      const data = await auth.login(email, password);
      localStorage.setItem("token", `Bearer ${data.token}`);
      updateStore({ user: data.user, token: data.token, role: data.user.role });
      if (data.user.role === "user") {
        // history.replace("/menu");
        window.location = "/menu";
      } else {
        // history.replace("/order");
        window.location = "/order";
      }
    } catch (error) {
      // console.log(error.message);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const submitSuggestion = async () => {
    try {
      const data = await auth.suggestCompany(suggestedBy, suggestedCompanyName);
      setOpenSuggest(false);
      setSuggestedBy("");
      setSuggestedCompanyName("");
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }

    setDisable(false);
  };

  const addCompnay = async () => {
    const { name, deliveryPlace, phone, street, city } = companyData;

    let data = JSON.stringify({
      name,
      deliveryPlace,
      phone,
      street,
      city,
    });

    let headeris = {
      "Content-Type": "application/json",
    };
    await fetch(`${baseUrl}/admin/addcompany`, {
      method: "POST",
      headers: headeris,
      body: data,
    })
      .then((data) => {
        if (data.ok) {
          toast.success("Entreprise créée avec succès!");
          setCompanyData({
            name: "",
            phone: "",
            deliveryPlace: "",
            street: "",
            city: "",
          });
        } else {
          toast.error(data.statusText);
        }
        setDisable(false);
      })
      .catch((err) => {
        setDisable(false);
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={6} xs={12} zeroMinWidth>
          <div className="background">
            <div className={classes.signInInfo}>
              <Typography variant="h2" className={classes.welcome}>
                <Link to="/">
                  <img src={Logo} alt="" />
                </Link>
                <br />
              </Typography>
              <Typography variant="h3" className={classes.welcome2}>
                Bienvenue !
              </Typography>
              <button className="signInBtn" onClick={handleFormType}>
                {formType === "none" ? "Se connecter" : ""}
                {formType === "signup" ? "Se connecter" : ""}
                {formType === "signin" ? "S’inscrire" : ""}
              </button>
              {formType != "none" && (
                <button className="addcompanyBtn" onClick={handleAddCompanyBtn}>
                  Add a Company
                </button>
              )}
            </div>
          </div>
        </Grid>
        <Grid item md={6} xs={12} zeroMinWidth>
          <div className="signupForm">
            {formType === "signup" ? (
              <>
                <Typography variant="h2" className={classes.formHeading}>
                  S’inscrire
                </Typography>
                <SignupForm
                  handleFormChange={handleRegisterFormChange}
                  handleFormSubmit={handleSubmit}
                  errors={registerErrors}
                  companies={companies}
                  data={registerData}
                />
              </>
            ) : formType === "signin" ? (
              <>
                <Typography variant="h3" className={classes.formHeading}>
                  Se connecter
                </Typography>
                <LoginForm
                  handleFormChange={handleLoginFormChange}
                  handleFormSubmit={handleSubmit}
                  errors={loginErrors}
                  data={loginData}
                />
              </>
            ) : (
              <>
                <Typography
                  variant="h3"
                  className={classes.formHeading}
                  style={{ marginBottom: "20px" }}
                >
                  Entreprise
                </Typography>
                <AddCompanyForm
                  handleFormChange={handleCompanyFormChange}
                  handleFormSubmit={handleCompanySubmit}
                  errors={companyErrors}
                  data={companyData}
                />
              </>
            )}
          </div>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openSuggest}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSuggest}>
          <div className={classes.paper}>
            <Typography
              variant="h5"
              style={{ color: "#d10248" }}
              className={classes.welcome2}
            >
              Suggérer une entreprise
            </Typography>
            <InputWithLabel
              label="Adresse e-mail"
              value={suggestedBy}
              required={true}
              name="email"
              type="email"
              handleChange={handleSuggestFormChange}
              error={suggestErrors["email"] ? true : false}
              errorMessage={suggestErrors["email"]}
            />
            <InputWithLabel
              value={suggestedCompanyName}
              label="Entrez le nom de votre entreprise"
              required={true}
              name="companyName"
              type="text"
              handleChange={(e) => setSuggestedCompanyName(e.target.value)}
            />
            <button
              type="submit"
              className="signUpBtn"
              onClick={handleSuggestSubmit}
              disabled={disable}
            >
              Submit
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Signup;
