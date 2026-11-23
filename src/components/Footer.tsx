import type { Page } from '../App'
import { getShop } from '../lib/store'

type Props = { onNavigate: (p: Page) => void }

export function Footer({ onNavigate }: Props) {
  const shop = getShop()
  return (
    <footer className="bg-ink text-cream mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl text-brass mb-3">{shop.name}</h3>
          <p className="text-sm text-cream/70 leading-relaxed">
            Premium kurtis from carefully selected small manufacturer lots.
            Quality fabric, thoughtful design, fair prices.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-brass">Quick links</h4>
          <div className="flex flex-col gap-2 text-sm text-cream/80">
            <button onClick={() => onNavigate({ name: 'shop' })} className="text-left hover:text-brass">Shop</button>
            <button onClick={() => onNavigate({ name: 'story' })} className="text-left hover:text-brass">Our Story</button>
            <button onClick={() => onNavigate({ name: 'admin' })} className="text-left hover:text-brass">Admin</button>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-brass">Contact</h4>
          <p className="text-sm text-cream/80">WhatsApp: {shop.whatsapp.replace(/^91/, '')}</p>
          <p className="text-sm text-cream/80 mt-1">{shop.city}</p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-cream/50">
        © {new Date().getFullYear()} {shop.name}. All rights reserved.
      </div>
    </footer>
  )
}
