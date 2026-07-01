import Link from 'next/link'
import { getMetafieldValue, formatCurrency } from '@/lib/cosmic'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const name = getMetafieldValue(product.metadata?.name) || product.title
  const sku = getMetafieldValue(product.metadata?.sku)
  const category = getMetafieldValue(product.metadata?.category)
  const image = product.metadata?.product_image

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {image?.imgix_url ? (
          <img
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
            📦
          </div>
        )}
      </div>
      <div className="p-4">
        {category && (
          <span className="inline-block text-xs font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full mb-2">
            {category}
          </span>
        )}
        <h3 className="font-semibold text-gray-900 line-clamp-1">{name}</h3>
        {sku && <p className="text-xs text-gray-400 mt-1">SKU: {sku}</p>}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(product.metadata?.selling_price)}
          </span>
        </div>
      </div>
    </Link>
  )
}