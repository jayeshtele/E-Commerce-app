import { Star } from 'lucide-react'

export default function RatingStars({ rating = 0, compact = false }) {
  const filledStars = Math.round(rating)

  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={compact ? 14 : 16}
          className={
            index < filledStars
              ? 'fill-[#f4b740] text-[#f4b740]'
              : 'fill-slate-200 text-slate-200'
          }
        />
      ))}
      <span
        className={`ml-1 font-bold text-slate-700 ${
          compact ? 'text-xs' : 'text-sm'
        }`}
      >
        {Number(rating).toFixed(1)}
      </span>
    </div>
  )
}
