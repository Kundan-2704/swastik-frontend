// export const sumCartItemSellingPrice = (cartItems: any[] = []) => {
//   return cartItems.reduce(
//     (total, item) =>
//       total + item.product.sellingPrice * item.quantity,
//     0
//   );
// };




// export const sumCartItemMrpPrice = (cartItems: any[] = []) => {
//   return cartItems.reduce(
//     (total, item) =>
//       total + item.product.mrpPrice * item.quantity,
//     0
//   );
// };


// sumCartItem.ts

export const sumCartItemSellingPrice = (cartItems: any[] = []) => {
  return cartItems.reduce((total, item) => {
    if (!item || !item.product) return total;

    const price = item.product.sellingPrice || 0;
    const quantity = item.quantity || 0;

    return total + price * quantity;
  }, 0);
};

export const sumCartItemMrpPrice = (cartItems: any[] = []) => {
  return cartItems.reduce((total, item) => {
    if (!item || !item.product) return total;

    const mrp = item.product.mrpPrice || 0;
    const quantity = item.quantity || 0;

    return total + mrp * quantity;
  }, 0);
};
