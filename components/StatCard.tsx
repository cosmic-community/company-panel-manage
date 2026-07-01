interface StatCardProps {
  label: string
  value: string
  icon: string
  accent?: string
}

export default function StatCard({ label, value, icon, accent = 'bg-brand-50 text-brand-700' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${accent}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}