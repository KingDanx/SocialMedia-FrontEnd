import React, { useState, useEffect } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import axios from "axios";
import useForm from "../useForm";
import TextField from "@mui/material/TextField";

const AboutMe = ({ user, setUser, profile, render }) => {

  const updateAboutMe = async () => {
    await axios
      .put(
        `http://localhost:5000/api/users/${user._id}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          aboutMe: formValue.aboutMe,
          email: user.email,
          password: user.password,
        },
        { headers: { "x-auth-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        console.log(user);
      });
  };

  const { formValue, handleChange, handleSubmit, setFormValue } =
    useForm(updateAboutMe);

  return (
    <div className="style-about-me">
      <span>
        {" "}
        {profile !== user ? null :
        <TextField
        id="aboutMe"
        label="About Me"
        multiline
        InputLabelProps={{ shrink: true }}
        defaultValue={profile.aboutMe}
        onChange={(event) => handleChange(event)}
        name="aboutMe"
      />}
      {profile === user ? null : <TextField
        id="aboutYou"
        label={`About ${profile.firstName}`}
        multiline
        InputLabelProps={{ shrink: true }}
        defaultValue={profile.aboutMe}
        onChange={(event) => handleChange(event)}
        name="aboutMe"
        disabled
      />}
      </span>
      <span>
        {profile !== user ? null : <button onClick={(event) => handleSubmit(event)} className="our-button about-me-button">
          <AppRegistrationIcon fontSize="medium"></AppRegistrationIcon>
        </button>}
        
      </span>
    </div>
  );
};

export default AboutMe;
