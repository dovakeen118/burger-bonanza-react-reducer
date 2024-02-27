const postBurgerOrder = async (order) => {
  try {
    const response = await fetch("/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    console.error(`Error in fetch: ${err.message}`);
  }
};

export default postBurgerOrder;
