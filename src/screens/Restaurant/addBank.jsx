import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputWithLabel from "../../Components/common/inputWithLabel";
import makeStyles from "@material-ui/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Joi from "joi-browser";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { stripePK } from "../../config";
import moment from "moment";
import { addRestaurantBank } from "../../services/restaurantService";
import { Store, UpdateStore } from "../../context/StoreContext";
import { toast } from "react-toastify";

// import DesktopDatePicker from "@material-ui/core/DesktopDatePicker";

const steps = ["Person Details", "Company Details", "Bank Details"];

const useStyles = makeStyles({
  form: {
    marginTop: "15px",
    maxWidth: "100%",
  },
  imgDiv: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
  },
  submitBtn: {
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
  },
  textField: {
    width: "100%",
    marginBottom: "20px",
    color: "red",
  },
  phoneStyle: {
    "& .MuiInputBase-input": {
      marginLeft: "27px",
    },
  },
});

let token = "";
let personToken = "";

const AddBank = () => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const [personDetails, setpersonDetails] = useState({
    firstName: "",
    lastName: "",
    dob: "2000-01-01",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    title: "",
    director: true,
    executive: true,
    owner: true,
    representative: true,
  });
  const stripe = useStripe();
  // const [token, setToken] = useState("");
  // const [personToken, setPersonToken] = useState("");

  const { user } = Store();
  const updateStore = UpdateStore();

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [frontError, setFrontError] = useState(false);
  const [backError, setBackError] = useState(false);

  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    taxId: "",
  });

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    iban: "",
  });

  const [personErrors, setPersonErrors] = useState({});
  const [companyErrors, setCompanyErrors] = useState({});
  const [bankErrors, setBankErrors] = useState({});
  const [disable, setDisable] = useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      let errors = validate(personDetails, personSchema);
      let allErrors = { ...errors };

      let diff = moment().diff(personDetails["dob"], "years", false);
      if (diff < 13) {
        allErrors["dob"] = "Age should be above 13";
      }
      setPersonErrors(allErrors || {});

      if (front === "") {
        setFrontError(true);
      } else {
        setFrontError(false);
      }
      if (back === "") {
        setBackError(true);
      } else {
        setBackError(false);
      }
      if (errors != null || front === "" || back === "") {
        return;
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      let errors = validate(companyDetails, companySchema);
      setCompanyErrors(errors || {});
      if (errors != null) return;
      else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePersonDataChange = (e) => {
    const { name, value, checked, files } = e.target;

    if (
      name === "director" ||
      name === "executive" ||
      name === "owner" ||
      name === "representative"
    ) {
      setpersonDetails((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "dob") {
      let diff = moment().diff(value, "years", false);
      if (diff >= 13) {
        setpersonDetails((prev) => ({ ...prev, [name]: value }));
        const allErrors = { ...personErrors };
        delete allErrors[name];
        setPersonErrors(allErrors);
      } else {
        setpersonDetails((prev) => ({ ...prev, [name]: value }));
        const allErrors = { ...personErrors };
        allErrors[name] = "Age should be above 13";
        setPersonErrors(allErrors);
      }
    } else if (name === "phone") {
      if (value.length <= 9) {
        const allErrors = { ...personErrors };
        const errorMessage = validateProperty(name, value, personSchema);
        if (errorMessage) allErrors[name] = errorMessage;
        else delete allErrors[name];
        setPersonErrors(allErrors);
        setpersonDetails((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "postalCode") {
      if (value.length <= 5) {
        const allErrors = { ...personErrors };
        const errorMessage = validateProperty(name, value, personSchema);
        if (errorMessage) allErrors[name] = errorMessage;
        else delete allErrors[name];
        setPersonErrors(allErrors);
        setpersonDetails((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "front") {
      setFront(files[0]);
    } else if (name === "back") {
      setBack(files[0]);
    } else {
      const allErrors = { ...personErrors };
      const errorMessage = validateProperty(name, value, personSchema);
      if (errorMessage) allErrors[name] = errorMessage;
      else delete allErrors[name];
      setPersonErrors(allErrors);
      setpersonDetails((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleCompanyDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length <= 9) {
        const allErrors = { ...companyErrors };
        const errorMessage = validateProperty(name, value, companySchema);
        if (errorMessage) allErrors[name] = errorMessage;
        else delete allErrors[name];
        setCompanyErrors(allErrors);
        setCompanyDetails((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "taxId") {
      if (value.length <= 13) {
        const allErrors = { ...companyErrors };
        const errorMessage = validateProperty(name, value, companySchema);
        if (errorMessage) allErrors[name] = errorMessage;
        else delete allErrors[name];
        setCompanyErrors(allErrors);
        setCompanyDetails((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "postalCode") {
      if (value.length <= 5) {
        const allErrors = { ...personErrors };
        const errorMessage = validateProperty(name, value, companySchema);
        if (errorMessage) allErrors[name] = errorMessage;
        else delete allErrors[name];
        setCompanyErrors(allErrors);
        setCompanyDetails((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      const allErrors = { ...companyErrors };
      const errorMessage = validateProperty(name, value, companySchema);
      if (errorMessage) allErrors[name] = errorMessage;
      else delete allErrors[name];
      setCompanyErrors(allErrors);
      setCompanyDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBankDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "iban") {
      if (value.length <= 27) {
        const allErrors = { ...bankErrors };
        const errorMessage = validateProperty(name, value, bankSchema);
        if (errorMessage) allErrors[name] = errorMessage;
        else delete allErrors[name];
        setBankErrors(allErrors);
        setBankDetails((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      const allErrors = { ...bankErrors };
      const errorMessage = validateProperty(name, value, bankSchema);
      if (errorMessage) allErrors[name] = errorMessage;
      else delete allErrors[name];
      setBankErrors(allErrors);
      setBankDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateProperty = (name, value, schemaName) => {
    const obj = { [name]: value };
    const schema = {
      [name]: schemaName[name],
    };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  const validate = (data, schema) => {
    const options = { abortEarly: false };
    let errors = {};
    const result = Joi.validate(data, schema, options);
    if (!result.error) return null;
    for (let item of result.error.details) {
      errors[item.path] = item.message;
    }

    return errors;
  };
  const handleSubmit = async () => {
    try {
      setDisable(true);
      let errors = validate(bankDetails, bankSchema);
      setBankErrors(errors || {});
      if (errors != null) {
        setDisable(false);
        return;
      }
      let err = await getToken();
      if (err && err.length != 0) {
        toast.error(err[0]);
        setDisable(false);
        return;
      }
      let data = await addRes();
    } catch (error) {
      setDisable(false);
      if ({ ...error }) {
        toast.error({ ...error }.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const addRes = async () => {
    try {
      const data = await addRestaurantBank(appendBankInforToFormData());
      updateStore({ user: data.restaurant });
      setDisable(false);
      toast.success("Success");
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      setDisable(false);
      if ({ ...error }) {
        toast.error({ ...error }.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const appendBankInforToFormData = () => {
    const fd = new FormData();
    const date = JSON.stringify(new Date(personDetails["dob"]));
    fd.append("phone", personDetails["phone"]);
    fd.append("DOB", date);
    fd.append("bankName", bankDetails["bankName"]);
    fd.append("iban", bankDetails["iban"]);
    fd.append("front", front);
    fd.append("back", back);
    fd.append("token", token.token.id);
    fd.append("personToken", personToken.token.id);
    return fd;
  };

  const getToken = async () => {
    //Retrieving front and back documentation ids//
    const frontData = new FormData();
    frontData.append("file", front);
    frontData.append("purpose", "identity_document");
    const frontfileResult = await fetch("https://uploads.stripe.com/v1/files", {
      method: "POST",
      headers: { Authorization: `Bearer ${stripePK}` },
      body: frontData,
    });
    const backData = new FormData();

    backData.append("file", back);
    backData.append("purpose", "identity_document");

    const backfileResult = await fetch("https://uploads.stripe.com/v1/files", {
      method: "POST",
      headers: { Authorization: `Bearer ${stripePK}` },
      body: frontData,
    });

    const frontfileData = await frontfileResult.json();
    const backfileData = await backfileResult.json();

    let pError = await getPersonToken(frontfileData, backfileData);
    let aError = await getAccountToken(frontfileData, backfileData);

    let errors = [];
    if (pError) {
      errors.push(pError);
    }
    if (aError) {
      errors.push(aError);
    }
    return errors;
  };

  const getPersonToken = async (frontfileData, backfileData) => {
    try {
      // Creating person token//
      let day = moment(personDetails["dob"]).format("D");
      let month = moment(personDetails["dob"]).format("M");
      let year = moment(personDetails["dob"]).format("Y");

      let data = {
        person: {
          first_name: personDetails["firstName"],
          last_name: personDetails["lastName"],
          address: {
            line1: personDetails["address"],
            postal_code: personDetails["postalCode"],
            city: personDetails["city"],
          },
          relationship: {
            director: personDetails["director"],
            executive: personDetails["executive"],
            owner: personDetails["owner"],
            representative: personDetails["representative"],
            title: personDetails["title"],
          },
          dob: {
            day: day,
            month: month,
            year: year,
          },
          phone: "+33" + personDetails["phone"],
          email: user.email,
          verification: {
            document: {
              front: frontfileData.id,
              back: backfileData.id,
            },
            additional_document: {
              front: frontfileData.id,
              back: backfileData.id,
            },
          },
        },
      };
      const personResult = await stripe.createToken("person", data);
      if (personResult.error) {
        return personResult.error.message;
      } else {
        personToken = personResult;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAccountToken = async (frontfileData, backfileData) => {
    try {
      //Creating account token//
      const accountResult = await stripe.createToken("account", {
        business_type: "company",
        company: {
          name: companyDetails["name"],
          address: {
            line1: companyDetails["address"],
            postal_code: companyDetails["postalCode"],
            city: companyDetails["city"],
          },
          phone: "+33" + companyDetails["phone"],
          tax_id: companyDetails["taxId"],
          directors_provided: personDetails["director"],
          executives_provided: personDetails["executive"],
          owners_provided: personDetails["owner"],
          verification: {
            document: {
              front: frontfileData.id,
              back: backfileData.id,
            },
          },
        },
        tos_shown_and_accepted: true,
      });
      if (accountResult.error) {
        return accountResult.error.message;
      } else {
        token = accountResult;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const personSchema = {
    firstName: Joi.string()
      .min(3)
      .required()
      .label("First Name")
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
      .min(3)
      .required()
      .label("Last Name")
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

    dob: Joi.date()
      .label("Date of birth")
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.type) {
            case "string.empty":
              err.message = `${err.context.label} ne doit pas être vide!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),

    phone: Joi.string()
      .required()
      .label("Téléphone")
      .min(9)
      .max(9)
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
    address: Joi.string()
      .required()
      .label("Address")
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
    city: Joi.string()
      .min(3)
      .required()
      .label("Ville")
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
    postalCode: Joi.string()
      .min(5)
      .max(5)
      .required()
      .label("Code Postal")
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
    title: Joi.string()
      .min(3)
      .required()
      .label("Title")
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
    director: Joi.boolean(),
    executive: Joi.boolean(),
    owner: Joi.boolean(),
    representative: Joi.boolean(),
  };

  const companySchema = {
    name: Joi.string()
      .min(3)
      .required()
      .label("Name")
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
      .min(9)
      .max(9)
      .label("Téléphone")
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
    address: Joi.string()
      .required()
      .label("Address")
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
    city: Joi.string()
      .min(3)
      .required()
      .label("Ville")
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
    postalCode: Joi.string()
      .min(5)
      .max(5)
      .required()
      .label("Code Postal")
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
    taxId: Joi.string()
      .min(13)
      .max(13)
      .required()
      .regex(/\bFR|\bfr/)
      .regex(/^[A-Za-z]{4}/)
      .regex(/[0-9]{9}\b/)
      .label("Tax ID")
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
            case "string.regex.base":
              err.message = `${err.context.label} doit être de la forme 'FRXX000000000' `;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  };

  const bankSchema = {
    bankName: Joi.string()
      .required()
      .label("Nom de banque")
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
    iban: Joi.string()
      .min(27)
      .max(27)
      .required()
      .label("Iban")
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Typography variant="h6">
          <b>Connect Your Bank Account</b>
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel
                    StepIconProps={{ sx: { color: "red" } }}
                    {...labelProps}
                  >
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography
                sx={{ mt: 2, mb: 1 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                Your account has been connected.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <div className={classes.form}>
                  <div
                    style={{
                      height: "120px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "48%" }}>
                      <InputWithLabel
                        value={personDetails["firstName"]}
                        label="First Name"
                        name="firstName"
                        required={true}
                        type="text"
                        handleChange={(e) => handlePersonDataChange(e)}
                        error={personErrors["firstName"] ? true : false}
                        errorMessage={personErrors["firstName"]}
                      />
                    </div>
                    <div style={{ width: "48%" }}>
                      <InputWithLabel
                        value={personDetails["lastName"]}
                        name="lastName"
                        label="Last Name"
                        required={true}
                        type="text"
                        handleChange={(e) => handlePersonDataChange(e)}
                        error={personErrors["lastName"] ? true : false}
                        errorMessage={personErrors["lastName"]}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "80px",
                    }}
                  >
                    <div style={{ width: "48%", height: "50%" }}>
                      <TextField
                        value={
                          personDetails["dob"]
                            ? personDetails["dob"]
                            : "2000-01-01"
                        }
                        name="dob"
                        id="dob"
                        label="Date of Birth"
                        type="date"
                        color="secondary"
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        onChange={(e) => handlePersonDataChange(e)}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: "#d10248" },
                        }}
                        InputProps={{
                          disableUnderline: true,
                          style: { paddingTop: "6px", paddingBottom: "6px" },
                        }}
                      />
                      {personErrors["dob"] && (
                        <Typography
                          component="div"
                          variant="caption"
                          style={{ color: "red" }}
                        >
                          {personErrors["dob"]}
                        </Typography>
                      )}
                    </div>
                    <div
                      style={{
                        width: "48%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          marginTop: "14px",
                          marginLeft: "11px",
                        }}
                      >
                        +33
                      </div>
                      <InputWithLabel
                        className={classes.phoneStyle}
                        value={personDetails["phone"]}
                        name="phone"
                        label="Phone Number"
                        required={true}
                        name="phone"
                        type="number"
                        handleChange={(e) => handlePersonDataChange(e)}
                        error={personErrors["phone"] ? true : false}
                        errorMessage={personErrors["phone"]}
                      />
                    </div>
                  </div>

                  <FormLabel
                    component="legend"
                    style={{ color: "#d10248", marginBottom: "20px" }}
                  >
                    Address
                  </FormLabel>
                  <InputWithLabel
                    value={personDetails["address"]}
                    name="address"
                    label="Address line 1"
                    required={true}
                    type="text"
                    handleChange={(e) => handlePersonDataChange(e)}
                    error={personErrors["address"] ? true : false}
                    errorMessage={personErrors["address"]}
                  />
                  <div
                    style={{
                      height: "120px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "48%" }}>
                      <InputWithLabel
                        value={personDetails["postalCode"]}
                        name="postalCode"
                        label="Postal Code"
                        required={true}
                        type="number"
                        handleChange={(e) => handlePersonDataChange(e)}
                        error={personErrors["postalCode"] ? true : false}
                        errorMessage={personErrors["postalCode"]}
                      />
                    </div>
                    <div style={{ width: "48%" }}>
                      <InputWithLabel
                        value={personDetails["city"]}
                        name="city"
                        label="City"
                        required={true}
                        type="text"
                        handleChange={(e) => handlePersonDataChange(e)}
                        error={personErrors["city"] ? true : false}
                        errorMessage={personErrors["city"]}
                      />
                    </div>
                  </div>

                  <InputWithLabel
                    value={personDetails["title"]}
                    name="title"
                    label=" Title in Company"
                    required={true}
                    type="text"
                    handleChange={(e) => handlePersonDataChange(e)}
                    error={personErrors["title"] ? true : false}
                    errorMessage={personErrors["title"]}
                  />

                  {/* <FormLabel
                    component="legend"
                    style={{ color: "#d10248", marginBottom: "20px" }}
                  >
                    Role (select your role(s) in the company)
                  </FormLabel>
                   <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={personDetails["director"]}
                          name="director"
                          onChange={(e) => handlePersonDataChange(e)}
                          name="director"
                        />
                      }
                      label="Director"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={personDetails["executive"]}
                          name="executive"
                          onChange={(e) => handlePersonDataChange(e)}
                          name="executive"
                        />
                      }
                      label="Executive"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={personDetails["owner"]}
                          name="owner"
                          onChange={(e) => handlePersonDataChange(e)}
                          name="owner"
                        />
                      }
                      label="Owner"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={personDetails["representative"]}
                          name="representative"
                          onChange={(e) => handlePersonDataChange(e)}
                          name="representative"
                        />
                      }
                      label="Representative"
                    />
                  </div> */}

                  <Typography
                    component="div"
                    variant="caption"
                    style={{ color: "#D20249", textAlign: "center" }}
                  >
                    <b>Télécharger l'identifiant Gouvernemental</b>
                  </Typography>

                  <div className={classes.imgDiv}>
                    <div>
                      <label
                        htmlFor="front"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        <input
                          style={{ display: "none" }}
                          id="front"
                          name="front"
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={(e) => handlePersonDataChange(e)}
                        />
                        <Button
                          variant="contained"
                          component="span"
                          color="secondary"
                          style={{ fontSize: "10px" }}
                        >
                          Face Avant
                        </Button>
                        <br />
                        <div
                          style={{
                            color: frontError ? "#f44336" : "",
                            fontSize: frontError ? "12px" : "16px",
                          }}
                        >
                          {front
                            ? front.name
                            : frontError
                            ? "Document Front cannot be empty"
                            : ""}
                        </div>
                      </label>
                    </div>

                    <div>
                      <label
                        htmlFor="back"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-end",
                        }}
                      >
                        <input
                          style={{ display: "none" }}
                          id="back"
                          name="back"
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={(e) => handlePersonDataChange(e)}
                        />

                        <Button
                          variant="contained"
                          component="span"
                          color="secondary"
                          style={{ fontSize: "10px" }}
                        >
                          Face Arrière
                        </Button>
                        <br />
                        <div
                          style={{
                            color: backError ? "#f44336" : "",
                            fontSize: backError ? "12px" : "16px",
                          }}
                        >
                          {back
                            ? back.name
                            : backError
                            ? "Document Back cannot be empty"
                            : ""}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              ) : activeStep === 1 ? (
                <div className={classes.form}>
                  <InputWithLabel
                    value={companyDetails["name"]}
                    label="Company Name"
                    required={true}
                    name="name"
                    type="text"
                    handleChange={(e) => handleCompanyDataChange(e)}
                    error={companyErrors["name"] ? true : false}
                    errorMessage={companyErrors["name"]}
                  />
                  <div style={{ height: "80px" }}>
                    <div
                      style={{
                        position: "absolute",
                        marginTop: "14px",
                        marginLeft: "11px",
                      }}
                    >
                      +33
                    </div>

                    <InputWithLabel
                      className={classes.phoneStyle}
                      value={companyDetails["phone"]}
                      label="Company Phone Number"
                      required={true}
                      name="phone"
                      type="number"
                      handleChange={(e) => handleCompanyDataChange(e)}
                      error={companyErrors["phone"] ? true : false}
                      errorMessage={companyErrors["phone"]}
                    />
                  </div>
                  <FormLabel
                    component="legend"
                    style={{ color: "#d10248", marginBottom: "20px" }}
                  >
                    Address
                  </FormLabel>
                  <InputWithLabel
                    value={companyDetails["address"]}
                    label="Address line 1"
                    required={true}
                    type="text"
                    name="address"
                    handleChange={(e) => handleCompanyDataChange(e)}
                    error={companyErrors["address"] ? true : false}
                    errorMessage={companyErrors["address"]}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: "120px",
                    }}
                  >
                    <div style={{ width: "48%" }}>
                      <InputWithLabel
                        value={companyDetails["postalCode"]}
                        label="Postal Code"
                        required={true}
                        type="number"
                        name="postalCode"
                        handleChange={(e) => handleCompanyDataChange(e)}
                        error={companyErrors["postalCode"] ? true : false}
                        errorMessage={companyErrors["postalCode"]}
                      />
                    </div>
                    <div style={{ width: "48%" }}>
                      <InputWithLabel
                        value={companyDetails["city"]}
                        label="City"
                        required={true}
                        type="text"
                        name="city"
                        handleChange={(e) => handleCompanyDataChange(e)}
                        error={companyErrors["city"] ? true : false}
                        errorMessage={companyErrors["city"]}
                      />
                    </div>
                  </div>
                  <InputWithLabel
                    value={companyDetails["taxId"]}
                    label="VAT number/Tax ID (n° TVA)"
                    required={true}
                    name="taxId"
                    type="text"
                    handleChange={(e) => handleCompanyDataChange(e)}
                    error={companyErrors["taxId"] ? true : false}
                    errorMessage={companyErrors["taxId"]}
                  />
                </div>
              ) : (
                <div className={classes.form}>
                  <InputWithLabel
                    value={bankDetails["bankName"]}
                    label="Nom de banque"
                    required={true}
                    name="bankName"
                    type="text"
                    handleChange={(e) => handleBankDataChange(e)}
                    error={bankErrors["bankName"] ? true : false}
                    errorMessage={bankErrors["bankName"]}
                  />
                  <InputWithLabel
                    value={bankDetails["iban"]}
                    label="Iban"
                    required={true}
                    name="iban"
                    type="text"
                    placeholder="Entrez un numéro IBAN à 27 chiffres"
                    handleChange={(e) => handleBankDataChange(e)}
                    error={bankErrors["iban"] ? true : false}
                    errorMessage={bankErrors["iban"]}
                  />

                  {/* 
            <Button
              className={classes.submitBtn}
              color="secondary"
              variant="contained"
              //   onClick={handleSubmit}
            >
              Mettre À jour
            </Button> */}
                </div>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    color="inherit"
                    disabled={activeStep === 0 || disable}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                    disabled={disable}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
};

export default AddBank;
