// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Contacts
export type ContactType = 'Customer' | 'Supplier';

export interface Contact extends CosmicObject {
  type: 'contacts';
  metadata: {
    name?: string;
    type?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
}

// Products
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    sku?: string;
    category?: string;
    cost_price?: number;
    selling_price?: number;
    product_image?: CosmicImage;
  };
}

// Sales
export interface Sale extends CosmicObject {
  type: 'sales';
  metadata: {
    invoice_number?: string;
    date?: string;
    customer?: Contact;
    product?: Product;
    quantity?: number;
    unit_price?: number;
    total_amount?: number;
    payment_status?: string;
  };
}

// Purchases
export interface Purchase extends CosmicObject {
  type: 'purchases';
  metadata: {
    reference_number?: string;
    date?: string;
    supplier?: Contact;
    product?: Product;
    quantity?: number;
    unit_cost?: number;
    total_amount?: number;
    payment_status?: string;
  };
}

// API response
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isSale(obj: CosmicObject): obj is Sale {
  return obj.type === 'sales';
}

export function isPurchase(obj: CosmicObject): obj is Purchase {
  return obj.type === 'purchases';
}