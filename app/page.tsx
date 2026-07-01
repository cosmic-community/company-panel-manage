import Link from 'next/link'
import { getSales, getPurchases, getProducts, getContacts, formatCurrency, formatDate, getMetafieldValue } from '@/lib/cosmic'
import StatCard from '@/components/StatCard'
import StatusBadge from '@/components/StatusBadge'
import PageHeader from '@/components/PageHeader'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function HomePage() {
  const [sales, purchases, products, contacts] = await Promise.all([
    getSales(),
    getPurchases(),
    getProducts(),
    getContacts(),
  ])

  const totalSales = sales.reduce(
    (sum, s) => sum + Number(s.metadata?.total_amount ?? 0),
    0
  )
  const totalPurchases = purchases.reduce(
    (sum, p) => sum + Number(p.metadata?.total_amount ?? 0),
    0
  )

  const recentSales = sales.slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Dashboard"
        description="An overview of your daily sales and purchases activity."
        icon="📊"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          label="Total Sales"
          value={formatCurrency(totalSales)}
          icon="💰"
          accent="bg-green-50 text-green-700"
        />
        <StatCard
          label="Total Purchases"
          value={formatCurrency(totalPurchases)}
          icon="🛒"
          accent="bg-purple-50 text-purple-700"
        />
        <StatCard
          label="Products"
          value={String(products.length)}
          icon="📦"
          accent="bg-brand-50 text-brand-700"
        />
        <StatCard
          label="Contacts"
          value={String(contacts.length)}
          icon="👥"
          accent="bg-yellow-50 text-yellow-700"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
        <Link
          href="/sales"
          className="text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          View all →
        </Link>
      </div>

      {recentSales.length === 0 ? (
        <EmptyState icon="💰" message="No sales recorded yet." />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentSales.map((sale) => {
                  const customer = sale.metadata?.customer
                  const customerName = customer
                    ? getMetafieldValue(customer.metadata?.name) || customer.title
                    : '—'
                  return (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {getMetafieldValue(sale.metadata?.invoice_number) || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{customerName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(sale.metadata?.date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                        {formatCurrency(sale.metadata?.total_amount)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={sale.metadata?.payment_status} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}