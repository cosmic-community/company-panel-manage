import { createBucketClient } from '@cosmicjs/sdk'
import type { Contact, Product, Sale, Purchase } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely renders metadata values that may be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function formatCurrency(value: unknown): string {
  const num = typeof value === 'number' ? value : Number(value ?? 0)
  if (Number.isNaN(num)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num)
}

export function formatDate(value: unknown): string {
  const str = getMetafieldValue(value)
  if (!str) return '—'
  const d = new Date(str)
  if (Number.isNaN(d.getTime())) return str
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export async function getSales(): Promise<Sale[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'sales' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const sales = response.objects as Sale[]
    return sales.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || '').getTime()
      const dateB = new Date(b.metadata?.date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch sales')
  }
}

export async function getPurchases(): Promise<Purchase[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'purchases' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    const purchases = response.objects as Purchase[]
    return purchases.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || '').getTime()
      const dateB = new Date(b.metadata?.date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch purchases')
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch products')
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .depth(1)
    return response.object as Product
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch product')
  }
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'contacts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Contact[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch contacts')
  }
}