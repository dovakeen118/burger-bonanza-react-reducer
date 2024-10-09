const getOrders = async () => {
  try {
    const response = await fetch("/api/v1/orders");
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    const responseBody = await response.json();
    return {
      completeOrders: responseBody.completeOrders,
      incompleteOrders: responseBody.incompleteOrders,
    };
  } catch (err) {
    console.error("Error in getOrders fetch: ", err);
  }
};

export default getOrders;
