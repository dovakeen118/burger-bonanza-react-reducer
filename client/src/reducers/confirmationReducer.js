const confirmationReducer = (confirmation, action) => {
  switch (action.type) {
    case "orderConfirmed": {
      return true;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default confirmationReducer;
