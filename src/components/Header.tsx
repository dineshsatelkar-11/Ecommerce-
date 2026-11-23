import type { Page } from '../App'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'

type Props = {
  shopName: string
  cartCount: number
  onNavigate: (p: Page) => void
}

export function Header({ shopName, cartCount, onNavigate }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate({ name: 'home' })}
          className="font-serif text-xl md:text-2xl tracking-wide text-madder font-semibold"
        >
          {shopName}
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-muted">
          <button onClick={() => onNavigate({ name: 'shop' })} className="hover:text-madder transition">Shop</button>
          <button onClick={() => onNavigate({ name: 'story' })} className="hover:text-madder transition">Our Story</button>
          <button
            onClick={() => onNavigate({ name: 'bag' })}
            className="relative flex items-center gap-1.5 hover:text-madder transition"
          >
            <ShoppingBag size={20} />
            Bag
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-madder text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        <div className="flex md:hidden items-center gap-3">
          <button onClick={() => onNavigate({ name: 'bag' })} className="relative p-2">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-madder text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="p-2">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-cream px-4 py-4 flex flex-col gap-3">
          <button onClick={() => { onNavigate({ name: 'shop' }); setOpen(false) }} className="text-left py-2 font-medium">Shop</button>
          <button onClick={() => { onNavigate({ name: 'story' }); setOpen(false) }} className="text-left py-2 font-medium">Our Story</button>
          <button onClick={() => { onNavigate({ name: 'admin' }); setOpen(false) }} className="text-left py-2 text-sm text-ink-muted">Admin</button>
        </div>
      )}
    </header>
  )
}
