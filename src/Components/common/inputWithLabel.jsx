import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  field: {
    width: "100%",
    marginBottom: "20px",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#EC008C",
      },
    },
  },
  input: {
    height: "50px",
  },
  multilineInput: {
    height: "auto",
  },
}));

const InputWithLabel = ({
  value = "",
  label,
  required = false,
  name,
  type,
  autoFocus = false,
  placeholder = "",
  handleChange,
  error = false,
  errorMessage = "",
  multiline = false,
  min,
  max,
  className,
}) => {
  const classes = useStyles();

  if (type === "number") {
    return (
      <TextField
        error={error}
        value={value}
        helperText={errorMessage}
        autoFocus={autoFocus}
        required={required}
        id={name}
        name={name}
        min={min}
        max={max}
        label={label}
        type={type}
        className={[className, classes.field]}
        variant="outlined"
        InputProps={{
          className: classes.input,
          inputProps: { min: min, max: max },
        }}
        InputLabelProps={{
          shrink: true,
          style: { color: "#EC008C" },
        }}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />
    );
  } else {
    return (
      <TextField
        value={value}
        error={error}
        helperText={errorMessage}
        autoFocus={autoFocus}
        required={required}
        id={name}
        name={name}
        label={label}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        type={type}
        className={classes.field}
        variant="outlined"
        InputProps={{
          className: multiline ? classes.multilineInput : classes.input,
        }}
        InputLabelProps={{
          shrink: true,
          style: { color: "#EC008C" },
        }}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />
    );
  }
};

export default InputWithLabel;
