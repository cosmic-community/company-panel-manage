import { getMetafieldValue } from '@/lib/cosmic'
import type { Contact } from '@/types'

interface ContactCardProps {
  contact: Contact
}

export default function ContactCard({ contact }: ContactCardProps) {
  const name = getMetafieldValue(contact.metadata?.name) || contact.title
  const type = getMetafieldValue(contact.metadata?.type)
  const email = getMetafieldValue(contact.metadata?.email)
  const phone = getMetafieldValue(contact.metadata?.phone)
  const company = getMetafieldValue(contact.metadata?.company)

  const isSupplier = type.toLowerCase().includes('supplier')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {company && <p className="text-sm text-gray-500">{company}</p>}
          </div>
        </div>
        {type && (
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              isSupplier
                ? 'bg-purple-100 text-purple-700'
                : 'bg-brand-50 text-brand-700'
            }`}
          >
            {type}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-1.5 text-sm">
        {email && (
          <p className="text-gray-600 flex items-center gap-2">
            <span>✉️</span>
            <a href={`mailto:${email}`} className="hover:text-brand-700 truncate">
              {email}
            </a>
          </p>
        )}
        {phone && (
          <p className="text-gray-600 flex items-center gap-2">
            <span>📞</span>
            <a href={`tel:${phone}`} className="hover:text-brand-700">
              {phone}
            </a>
          </p>
        )}
      </div>
    </div>
  )
}