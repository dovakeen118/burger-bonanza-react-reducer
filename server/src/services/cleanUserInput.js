const cleanUserInput = (formInput) => {
  return Object.entries(formInput).reduce((acc, [key, value]) => {
    if (value !== null && value.trim() !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export default cleanUserInput;
