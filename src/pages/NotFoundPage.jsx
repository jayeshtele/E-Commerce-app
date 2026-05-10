import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#f6f2ea] px-4 py-12">
      <EmptyState
        title="Page not found"
        message="That route does not match a NovaCart page."
      />
    </div>
  )
}
