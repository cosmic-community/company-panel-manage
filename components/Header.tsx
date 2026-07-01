import Link from 'next/link'

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Sales', href: '/sales' },
  { label: 'Purchases', href: '/purchases' },
  { label: 'Products', href: '/products' },
  { label: 'Contacts', href: '/contacts' },
]

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="font-semibold text-lg text-gray-900">
              Company Panel
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}