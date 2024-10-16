const confirmationReducer = (confirmation, action) => {
  switch (action.type) {
    case "orderConfirmed": {
      return { ...confirmation, confirmationNumber: action.confirmationNumber };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default confirmationReducer;
