import { getProducts } from '@/lib/cosmic'
import PageHeader from '@/components/PageHeader'
import ProductCard from '@/components/ProductCard'
import EmptyState from '@/components/EmptyState'

export const revalidate = 60

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Products"
        description="Your complete product inventory with pricing and details."
        icon="📦"
      />

      {products.length === 0 ? (
        <EmptyState icon="📦" message="No products added yet." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}