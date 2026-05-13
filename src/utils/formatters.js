export const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
})

export function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0)
}

export function formatCategory(category = '') {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function getDiscountedPrice(product) {
  if (!product) return 0

  return product.price - (product.price * product.discountPercentage) / 100
}

export function getStockTone(stock = 0) {
  if (stock <= 0) return 'Out of stock'
  if (stock <= 10) return 'Low stock'
  if (stock <= 35) return 'Selling fast'
  return 'In stock'
}
