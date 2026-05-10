export const selectCartItems = (state) => state.cart.items
export const selectLastOrder = (state) => state.cart.lastOrder

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectCartSummary = (state) => {
  const subtotal = state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const savings = state.cart.items.reduce(
    (total, item) =>
      total + ((item.price * item.discountPercentage) / 100) * item.quantity,
    0,
  )
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 12.99
  const tax = subtotal * 0.0725
  const total = Math.max(0, subtotal - savings + shipping + tax)

  return {
    subtotal,
    savings,
    shipping,
    tax,
    total,
  }
}
