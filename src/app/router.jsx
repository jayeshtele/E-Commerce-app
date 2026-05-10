import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import HomePage from '../pages/HomePage'
import NotFoundPage from '../pages/NotFoundPage'
import OrderSuccessPage from '../pages/OrderSuccessPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ProductsPage from '../pages/ProductsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'category/:categorySlug', element: <ProductsPage /> },
      { path: 'deals', element: <ProductsPage dealsOnly /> },
      { path: 'product/:productId', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'success', element: <OrderSuccessPage /> },
    ],
  },
])
