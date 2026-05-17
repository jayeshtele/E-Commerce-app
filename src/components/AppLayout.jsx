import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import {
  fetchUsdToInrRate,
  selectCurrencyStatus,
} from '../features/currency/currencySlice'
import { fetchCategories, fetchProducts } from '../features/products/productsSlice'
import Footer from './Footer'
import Header from './Header'

export default function AppLayout() {
  const dispatch = useDispatch()
  const productStatus = useSelector((state) => state.products.status)
  const categoryStatus = useSelector((state) => state.products.categoryStatus)
  const currencyStatus = useSelector(selectCurrencyStatus)

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, productStatus])

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategories())
    }
  }, [categoryStatus, dispatch])

  useEffect(() => {
    if (currencyStatus === 'idle') {
      dispatch(fetchUsdToInrRate())
    }
  }, [currencyStatus, dispatch])

  return (
    <div className="min-h-screen bg-[#050505] text-slate-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
