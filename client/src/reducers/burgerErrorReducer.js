const burgerErrorReducer = (errors, action) => {
  switch (action.type) {
    case "validationError": {
      return { ...action.errors };
    }
    case "resetErrors": {
      return {};
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default burgerErrorReducer;
