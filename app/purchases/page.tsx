import { getPurchases, formatCurrency, formatDate, getMetafieldValue } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import StatusBadge from '@/components/StatusBadge'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function PurchasesPage() {
  const purchases = await getPurchases()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Purchases"
        description="All recorded purchase orders and their payment status."
        icon="🛒"
      />

      {purchases.length === 0 ? (
        <EmptyState icon="🛒" message="No purchases recorded yet." />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchases.map((purchase) => {
                  const supplier = purchase.metadata?.supplier
                  const supplierName = supplier
                    ? getMetafieldValue(supplier.metadata?.name) || supplier.title
                    : '—'
                  const product = purchase.metadata?.product
                  const productName = product
                    ? getMetafieldValue(product.metadata?.name) || product.title
                    : '—'
                  return (
                    <tr key={purchase.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {getMetafieldValue(purchase.metadata?.reference_number) || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{supplierName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{productName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{formatDate(purchase.metadata?.date)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-right">
                        {getMetafieldValue(purchase.metadata?.quantity) || '0'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                        {formatCurrency(purchase.metadata?.total_amount)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={purchase.metadata?.payment_status} />
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