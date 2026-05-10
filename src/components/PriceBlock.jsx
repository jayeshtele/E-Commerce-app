import { formatCurrency, getDiscountedPrice } from '../utils/formatters'

export default function PriceBlock({ product, size = 'md' }) {
  const discountedPrice = getDiscountedPrice(product)
  const hasDiscount = product.discountPercentage > 0
  const priceSize = size === 'lg' ? 'text-3xl' : 'text-xl'

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={`${priceSize} font-black text-slate-950`}>
          {formatCurrency(discountedPrice)}
        </span>
        {hasDiscount && (
          <span className="text-sm font-semibold text-slate-500 line-through">
            {formatCurrency(product.price)}
          </span>
        )}
      </div>
      {hasDiscount && (
        <p className="mt-1 text-sm font-extrabold text-[#a24936]">
          {Math.round(product.discountPercentage)}% off
        </p>
      )}
    </div>
  )
}
