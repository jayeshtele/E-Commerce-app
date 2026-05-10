import {
  BadgeCheck,
  Box,
  ChevronLeft,
  Heart,
  PackageCheck,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import LoadingGrid from '../components/LoadingGrid'
import PriceBlock from '../components/PriceBlock'
import ProductCard from '../components/ProductCard'
import QuantityStepper from '../components/QuantityStepper'
import RatingStars from '../components/RatingStars'
import { addToCart } from '../features/cart/cartSlice'
import { fetchProductById } from '../features/products/productsSlice'
import { formatCategory, getStockTone } from '../utils/formatters'

export default function ProductDetailPage() {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const { selectedProduct, selectedStatus, items: products } = useSelector(
    (state) => state.products,
  )
  const [imageChoice, setImageChoice] = useState({ productId: null, image: '' })
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(fetchProductById(productId))
  }, [dispatch, productId])

  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return []

    return products
      .filter(
        (product) =>
          product.category === selectedProduct.category &&
          product.id !== selectedProduct.id,
      )
      .slice(0, 4)
  }, [products, selectedProduct])

  if (selectedStatus === 'idle' || selectedStatus === 'loading') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <LoadingGrid count={4} />
      </div>
    )
  }

  if (selectedStatus === 'failed' || !selectedProduct) {
    return (
      <EmptyState
        title="Product not found"
        message="The selected product could not be loaded from the live API."
      />
    )
  }

  const stockTone = getStockTone(selectedProduct.stock)
  const dimensions = selectedProduct.dimensions
  const defaultImage = selectedProduct.images?.[0] || selectedProduct.thumbnail
  const selectedImage =
    imageChoice.productId === selectedProduct.id ? imageChoice.image : defaultImage
  const safeQuantity = Math.min(quantity, Math.max(1, selectedProduct.stock))

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-black text-[#0f766e]"
      >
        <ChevronLeft size={18} />
        Back to products
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="grid gap-4 lg:grid-cols-[6rem_1fr]">
          <div className="order-last flex gap-3 overflow-x-auto lg:order-none lg:flex-col lg:overflow-visible">
            {[selectedProduct.thumbnail, ...(selectedProduct.images || [])]
              .filter(Boolean)
              .map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() =>
                    setImageChoice({ productId: selectedProduct.id, image })
                  }
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-white ${
                    selectedImage === image
                      ? 'border-[#0f766e] ring-4 ring-[#0f766e]/15'
                      : 'border-slate-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={selectedProduct.title}
                    className="h-full w-full object-contain p-2"
                  />
                </button>
              ))}
          </div>

          <div className="grid min-h-[26rem] place-items-center overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f3eadb]">
            <img
              src={selectedImage}
              alt={selectedProduct.title}
              className="max-h-[34rem] w-full object-contain p-6"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#12372a] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
              {formatCategory(selectedProduct.category)}
            </span>
            <span className="rounded-full bg-[#fff0df] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#a24936]">
              {stockTone}
            </span>
          </div>

          <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#0f766e]">
            {selectedProduct.brand || 'Nova Select'}
          </p>
          <h1 className="mt-2 text-4xl font-black leading-tight tracking-normal text-slate-950">
            {selectedProduct.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <RatingStars rating={selectedProduct.rating} />
            <span className="text-sm font-bold text-slate-500">
              SKU {selectedProduct.sku}
            </span>
          </div>

          <p className="mt-5 text-base leading-8 text-slate-600">
            {selectedProduct.description}
          </p>

          <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <PriceBlock product={selectedProduct} size="lg" />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <QuantityStepper
                value={safeQuantity}
                max={Math.max(1, selectedProduct.stock)}
                onChange={setQuantity}
              />
              <button
                type="button"
                onClick={() => dispatch(addToCart(selectedProduct, safeQuantity))}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#12372a] px-6 text-sm font-black text-white transition hover:bg-[#0f766e] sm:flex-none"
              >
                <ShoppingCart size={18} />
                Add to cart
              </button>
              <button
                type="button"
                aria-label="Save product"
                className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 text-slate-700"
              >
                <Heart size={19} />
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <DetailPill
              icon={Truck}
              label="Shipping"
              value={selectedProduct.shippingInformation}
            />
            <DetailPill
              icon={ShieldCheck}
              label="Warranty"
              value={selectedProduct.warrantyInformation}
            />
            <DetailPill
              icon={PackageCheck}
              label="Returns"
              value={selectedProduct.returnPolicy}
            />
            <DetailPill
              icon={Box}
              label="Minimum order"
              value={`${selectedProduct.minimumOrderQuantity} units`}
            />
          </div>

          <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-white p-5">
            <h2 className="flex items-center gap-2 text-lg font-black text-slate-950">
              <Ruler size={20} className="text-[#a24936]" />
              Product specifics
            </h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <Spec label="Weight" value={`${selectedProduct.weight} lb`} />
              <Spec label="Availability" value={selectedProduct.availabilityStatus} />
              {dimensions && (
                <>
                  <Spec label="Width" value={`${dimensions.width} cm`} />
                  <Spec label="Height" value={`${dimensions.height} cm`} />
                  <Spec label="Depth" value={`${dimensions.depth} cm`} />
                </>
              )}
              <Spec label="Tags" value={selectedProduct.tags?.join(', ')} />
            </dl>
          </div>
        </div>
      </div>

      {selectedProduct.reviews?.length > 0 && (
        <section className="mt-12">
          <div className="mb-5 flex items-center gap-2">
            <BadgeCheck className="text-[#0f766e]" size={22} />
            <h2 className="text-2xl font-black text-slate-950">
              Customer reviews
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {selectedProduct.reviews.map((review) => (
              <article
                key={`${review.reviewerEmail}-${review.comment}`}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <RatingStars rating={review.rating} compact />
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {review.comment}
                </p>
                <p className="mt-4 text-sm font-black text-slate-950">
                  {review.reviewerName}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-black text-slate-950">
            More from {formatCategory(selectedProduct.category)}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </section>
  )
}

function DetailPill({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
      <Icon className="text-[#0f766e]" size={20} />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
    </div>
  )
}

function Spec({ label, value }) {
  if (!value) return null

  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
      <dt className="font-semibold text-slate-500">{label}</dt>
      <dd className="text-right font-black text-slate-900">{value}</dd>
    </div>
  )
}
