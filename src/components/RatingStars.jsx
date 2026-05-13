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
              ? 'fill-[#facc15] text-[#facc15]'
              : 'fill-slate-200 text-slate-200'
          }
        />
      ))}
      <span
        className={`ml-1 font-bold text-slate-300 ${
          compact ? 'text-xs' : 'text-sm'
        }`}
      >
        {Number(rating).toFixed(1)}
      </span>
    </div>
  )
}
