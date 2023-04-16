import React from "react";
import { TextField } from "@mui/material";

const JDComponent = ({ previousStep, nextStep, handleChange, values }) => {
  const GoBack = (e) => {
    e.preventDefault();
    previousStep();
  };

  const Continue = (e) => {
    console.log(values);
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <TextField
        type="text"
        placeholder="Enter Job Description Here"
        variant="filled"
        value={values.jobDescriptionName}
        onChange={() => handleChange("jobDescriptionName")}
        hiddenLabel
        InputProps={{
          style: {
            background: "white",
            fontSize: "0.8rem",
            width: "90%",
            marginLeft: "5%",
            display: "flex",
            alignText: "center",
            borderRadius: "8px",
            boxShadow: "inset 0 2px 8px #e5e5e5",
          },
          disableUnderline: true,
        }}
      />

      <button onClick={Continue}>
        <b>Next</b>
      </button>

      <button onClick={GoBack}>
        <b>Back</b>
      </button>
    </div>
  );
};

export default JDComponent;