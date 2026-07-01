import { getContacts, getMetafieldValue } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import ContactCard from '@/components/ContactCard'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function ContactsPage() {
  const contacts = await getContacts()

  const customers = contacts.filter((c) =>
    getMetafieldValue(c.metadata?.type).toLowerCase().includes('customer')
  )
  const suppliers = contacts.filter((c) =>
    getMetafieldValue(c.metadata?.type).toLowerCase().includes('supplier')
  )
  const others = contacts.filter(
    (c) => !customers.includes(c) && !suppliers.includes(c)
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Contacts"
        description="Your customers and suppliers directory."
        icon="👥"
      />

      {contacts.length === 0 ? (
        <EmptyState icon="👥" message="No contacts added yet." />
      ) : (
        <div className="space-y-10">
          {customers.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Customers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {customers.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            </section>
          )}

          {suppliers.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Suppliers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {suppliers.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Other</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {others.map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}