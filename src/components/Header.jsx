import {
  Heart,
  Menu,
  PackageSearch,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { selectCartCount } from '../features/cart/cartSelectors'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'All Products' },
  { to: '/deals', label: 'Deals' },
  { to: '/category/laptops', label: 'Tech' },
  { to: '/category/womens-dresses', label: 'Fashion' },
]

export default function Header() {
  const cartCount = useSelector(selectCartCount)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(event) {
    event.preventDefault()
    const trimmedQuery = query.trim()
    navigate(trimmedQuery ? `/products?q=${encodeURIComponent(trimmedQuery)}` : '/products')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#fffaf1]/95 shadow-sm shadow-slate-950/5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm lg:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#12372a] text-[#f4c95d] shadow-lg shadow-emerald-950/15">
            <ShoppingBag size={22} />
          </span>
          <span className="hidden sm:block">
            <span className="block text-lg font-black tracking-normal text-slate-950">
              NovaCart
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#a24936]">
              Live market
            </span>
          </span>
        </Link>

        <form
          onSubmit={handleSearch}
          className="relative order-last flex w-full items-center lg:order-none lg:mx-4"
        >
          <PackageSearch
            size={18}
            className="pointer-events-none absolute left-4 text-slate-500"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search phones, shoes, beauty, groceries"
            className="h-12 w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-14 text-sm font-medium text-slate-900 outline-none ring-[#0f766e]/20 transition placeholder:text-slate-400 focus:border-[#0f766e] focus:ring-4"
          />
          <button
            type="submit"
            aria-label="Search products"
            className="absolute right-1.5 grid h-9 w-9 place-items-center rounded-full bg-[#0f766e] text-white transition hover:bg-[#115e59]"
          >
            <Search size={18} />
          </button>
        </form>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? 'bg-[#12372a] text-white'
                    : 'text-slate-700 hover:bg-white hover:text-slate-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/deals"
            aria-label="Deals"
            className="hidden h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-[#a24936] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:grid"
          >
            <Sparkles size={19} />
          </Link>
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm sm:grid"
          >
            <Heart size={19} />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="hidden h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm sm:grid"
          >
            <UserRound size={19} />
          </button>
          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-[#f4c95d] text-slate-950 shadow-md shadow-amber-900/10 transition hover:-translate-y-0.5"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#a24936] px-1.5 text-[11px] font-black text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-[#fffaf1] px-4 py-3 lg:hidden">
          <nav className="grid gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-bold ${
                    isActive
                      ? 'bg-[#12372a] text-white'
                      : 'bg-white text-slate-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
