import React from "react";
import InputWithLabel from "../../Components/common/inputWithLabel";
import "../../styles/signup.css";

const LoginForm = ({ handleFormChange, handleFormSubmit, errors, data }) => {
  return (
    <div className="formDiv">
      <form>
        <InputWithLabel
          value={data["email"]}
          label="Email"
          required={true}
          name="email"
          type="email"
          placeholder="e.g. example@example.com"
          handleChange={handleFormChange}
          error={errors["email"] ? true : false}
          errorMessage={errors["email"]}
        />
        <InputWithLabel
          value={data["password"]}
          label="Password"
          required={true}
          name="password"
          type="password"
          handleChange={handleFormChange}
          error={errors["password"] ? true : false}
          errorMessage={errors["password"]}
        />

        <button type="submit" className="signUpBtn" onClick={handleFormSubmit}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
