export const getTotal = (cart) => {
  let totalAmount = 0;
  let totalCost = 0;

  for (let item of cart.values()) {
    totalAmount += item.amount;
    totalCost += item.amount * item.price;
  }
  return { totalAmount, totalCost };
};
