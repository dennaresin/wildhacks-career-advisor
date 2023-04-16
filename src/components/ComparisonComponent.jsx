import React from "react";


const ComparisonComponent = ({ response, nextStep }) => {

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div class="container text-center">
      <h2>Resume and Job Description Comparison</h2>
      <p>{response}</p>
      <div class="align-self-center">
          <button class="btn btn-primary row justify-content-center" onClick={Continue}>
            <b>Continue</b>
          </button>
        </div>
    </div>
  );
};

export default ComparisonComponent;