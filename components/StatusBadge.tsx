import { getMetafieldValue } from '@/lib/cosmic'

interface StatusBadgeProps {
  status: unknown
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const value = getMetafieldValue(status)
  const lower = value.toLowerCase()

  let classes = 'bg-gray-100 text-gray-700'
  if (lower.includes('paid') || lower.includes('complete')) {
    classes = 'bg-green-100 text-green-700'
  } else if (lower.includes('pending')) {
    classes = 'bg-yellow-100 text-yellow-700'
  } else if (lower.includes('unpaid') || lower.includes('overdue') || lower.includes('cancel')) {
    classes = 'bg-red-100 text-red-700'
  } else if (lower.includes('partial')) {
    classes = 'bg-blue-100 text-blue-700'
  }

  if (!value) return <span className="text-gray-400 text-sm">—</span>

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {value}
    </span>
  )
}