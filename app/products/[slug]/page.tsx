// app/products/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct, formatCurrency, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const sku = getMetafieldValue(product.metadata?.sku)
  const category = getMetafieldValue(product.metadata?.category)
  const image = product.metadata?.product_image
  const costPrice = product.metadata?.cost_price
  const sellingPrice = product.metadata?.selling_price

  const margin =
    typeof sellingPrice === 'number' && typeof costPrice === 'number'
      ? sellingPrice - costPrice
      : null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:text-brand-800 mb-6"
      >
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
          {image?.imgix_url ? (
            <img
              src={`${image.imgix_url}?w=1000&h=1000&fit=crop&auto=format,compress`}
              alt={name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
              📦
            </div>
          )}
        </div>

        <div>
          {category && (
            <span className="inline-block text-xs font-medium text-brand-700 bg-brand-50 px-3 py-1 rounded-full mb-3">
              {category}
            </span>
          )}
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          {sku && <p className="text-sm text-gray-400 mt-2">SKU: {sku}</p>}

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-500">Selling Price</span>
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(sellingPrice)}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-500">Cost Price</span>
              <span className="text-lg font-medium text-gray-700">
                {formatCurrency(costPrice)}
              </span>
            </div>
            {margin !== null && (
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-500">Profit Margin</span>
                <span
                  className={`text-lg font-semibold ${
                    margin >= 0 ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {formatCurrency(margin)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}