const patchOrder = async ({ orderId, data }) => {
  try {
    const response = await fetch(`/api/v1/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    const responseBody = await response.json();
    return responseBody.order;
  } catch (err) {
    console.error(`Error in patchOrder fetch: ${err}`);
  }
};

export default patchOrder;
