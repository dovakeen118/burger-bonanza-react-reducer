import React from "react";

const FormError = ({ error = "", name }) => {
  if (error !== "") {
    return (
      <span className="form-error is-visible" id={`${name}-error`}>
        {error}
      </span>
    );
  }
  return null;
};

export default FormError;
