import EmptyState from '../components/EmptyState'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-12">
      <EmptyState
        title="Page not found"
        message="That route does not match a NovaCart page."
      />
    </div>
  )
}
