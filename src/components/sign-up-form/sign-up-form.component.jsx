import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../services/firebase.service";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";

const defaultFormValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const { displayName, email, password, confirmPassword } = formValues;

  const resetFormFields = () => {
    setFormValues(defaultFormValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // confirm passwords match
    if (password !== confirmPassword) {
      alert("passwords do not match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("this email is already in use");
      } else {
        console.log("error when creating user authentication:", err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="sign-up-form-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Submit</Button>
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default SignUpForm;
