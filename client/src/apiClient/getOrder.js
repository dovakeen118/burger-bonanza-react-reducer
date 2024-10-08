const getOrder = async (orderId) => {
  try {
    const response = await fetch(`/api/v1/orders/${orderId}`);
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    const responseBody = await response.json();
    return responseBody.order;
  } catch (err) {
    console.error(`Error in getOrder fetch: ${err}`);
  }
};

export default getOrder;
