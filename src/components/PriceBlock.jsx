import { useSelector } from 'react-redux'
import { selectUsdToInrRate } from '../features/currency/currencySlice'
import { formatCurrency, getDiscountedPrice } from '../utils/formatters'

export default function PriceBlock({ product, size = 'md' }) {
  const usdToInrRate = useSelector(selectUsdToInrRate)
  const discountedPrice = getDiscountedPrice(product)
  const hasDiscount = product.discountPercentage > 0
  const priceSize = size === 'lg' ? 'text-3xl' : 'text-xl'

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={`${priceSize} font-black text-slate-50`}>
          {formatCurrency(discountedPrice, usdToInrRate)}
        </span>
        {hasDiscount && (
          <span className="text-sm font-semibold text-slate-400 line-through">
            {formatCurrency(product.price, usdToInrRate)}
          </span>
        )}
      </div>
      {hasDiscount && (
        <p className="mt-1 text-sm font-extrabold text-[#f59e0b]">
          {Math.round(product.discountPercentage)}% off
        </p>
      )}
    </div>
  )
}
