const validateOrderData = (burgerPayload, orderName) => {
  const { type, isGlutenFree, side } = burgerPayload;
  let newErrors = {};

  if (orderName.trim() == "") {
    newErrors = {
      ...newErrors,
      name: "is required",
    };
  }

  if (type.trim() == "") {
    newErrors = {
      ...newErrors,
      type: "is required",
    };
  }

  if (isGlutenFree.trim() === "") {
    newErrors = {
      ...newErrors,
      isGlutenFree: "is required",
    };
  }

  if (side.trim() === "") {
    newErrors = {
      ...newErrors,
      side: "is required",
    };
  }

  return newErrors;
};

export default validateOrderData;
