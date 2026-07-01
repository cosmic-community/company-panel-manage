interface PageHeaderProps {
  title: string
  description?: string
  icon?: string
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        {icon && <span className="text-3xl">{icon}</span>}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      {description && (
        <p className="mt-2 text-gray-600">{description}</p>
      )}
    </div>
  )
}