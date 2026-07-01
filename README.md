# Company Panel Manage

![App Preview](https://imgix.cosmicjs.com/ca717300-7542-11f1-a44c-d7f5892df684-autopilot-photo-1554224155-6726b3ff858f-1782906514983.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive business management panel for tracking daily sales and purchases, managing products, and organizing contacts. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 📊 **Dashboard Overview** — Key metrics for sales, purchases, products, and contacts at a glance
- 💰 **Sales Management** — Browse sales records with invoice details, customers, and payment status
- 🛒 **Purchase Tracking** — View purchase orders, suppliers, and payment status
- 📦 **Product Catalog** — Full product inventory with SKUs, pricing, and images
- 👥 **Contact Directory** — Manage customers and suppliers in one place
- 📱 **Fully Responsive** — Beautiful experience on desktop, tablet, and mobile
- ⚡ **Server-Side Rendering** — Fast, SEO-friendly pages powered by Cosmic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a44fe45bc97f04ea2185ef2&clone_repository=6a44ff39bc97f04ea2185f43)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: A company panel for manage daily sales and purchases data and information."

### Code Generation Prompt

> Build a Next.js application for a website called "Company panel manage". The content is managed in Cosmic CMS with the following object types: contacts, products, sales, purchases. Create a beautiful, modern, responsive design with a homepage and pages for each content type. A company panel for manage daily sales and purchases data and information.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing the `contacts`, `products`, `sales`, and `purchases` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set your environment variables (these are provided automatically when deployed via Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all sales with connected objects
const { objects: sales } = await cosmic.objects
  .find({ type: 'sales' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single product
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .depth(1)
```

## Cosmic CMS Integration

This application reads from four Cosmic object types:

- **contacts** — name, type, email, phone, company
- **products** — name, sku, category, cost_price, selling_price, product_image
- **sales** — invoice_number, date, customer, product, quantity, unit_price, total_amount, payment_status
- **purchases** — reference_number, date, supplier, product, quantity, unit_cost, total_amount, payment_status

Connected objects (like the customer on a sale) are resolved using the Cosmic `depth` parameter. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel** — Import the repository, set environment variables, and deploy
- **Netlify** — Connect the repository and configure build settings

For production, set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.
<!-- README_END -->