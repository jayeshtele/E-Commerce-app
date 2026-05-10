import { createSlice } from '@reduxjs/toolkit'

const CART_STORAGE_KEY = 'novacart-items'

function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Local storage can be unavailable in restricted browsing modes.
  }
}

function cartLineFromProduct(product, quantity = 1) {
  return {
    id: product.id,
    title: product.title,
    brand: product.brand,
    price: product.price,
    discountPercentage: product.discountPercentage,
    thumbnail: product.thumbnail,
    rating: product.rating,
    stock: product.stock,
    category: product.category,
    shippingInformation: product.shippingInformation,
    returnPolicy: product.returnPolicy,
    quantity,
  }
}

const initialState = {
  items: loadCart(),
  lastOrder: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: {
      reducer(state, action) {
        const { product, quantity } = action.payload
        const existingItem = state.items.find((item) => item.id === product.id)

        if (existingItem) {
          existingItem.quantity = Math.min(
            existingItem.quantity + quantity,
            product.stock,
          )
        } else {
          state.items.push(cartLineFromProduct(product, quantity))
        }

        saveCart(state.items)
      },
      prepare(product, quantity = 1) {
        return { payload: { product, quantity } }
      },
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveCart(state.items)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find((cartItem) => cartItem.id === id)

      if (item) {
        item.quantity = Math.max(1, Math.min(quantity, item.stock))
      }

      saveCart(state.items)
    },
    clearCart(state) {
      state.items = []
      saveCart(state.items)
    },
    placeOrder(state, action) {
      const subtotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      )
      const savings = state.items.reduce(
        (total, item) =>
          total +
          ((item.price * item.discountPercentage) / 100) * item.quantity,
        0,
      )
      const shipping = subtotal > 250 ? 0 : 12.99
      const tax = subtotal * 0.0725
      const total = subtotal - savings + shipping + tax
      const createdAt = new Date().toISOString()
      const deliveryStart = new Date()
      deliveryStart.setDate(deliveryStart.getDate() + 3)
      const deliveryEnd = new Date()
      deliveryEnd.setDate(deliveryEnd.getDate() + 6)

      state.lastOrder = {
        id: `NV-${Math.floor(100000 + Math.random() * 900000)}`,
        items: state.items,
        customer: action.payload,
        subtotal,
        savings,
        shipping,
        tax,
        total,
        createdAt,
        deliveryStart: deliveryStart.toISOString(),
        deliveryEnd: deliveryEnd.toISOString(),
      }
      state.items = []
      saveCart(state.items)
    },
  },
})

export const {
  addToCart,
  clearCart,
  placeOrder,
  removeFromCart,
  updateQuantity,
} = cartSlice.actions

export default cartSlice.reducer
