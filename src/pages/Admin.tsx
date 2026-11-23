import { useState, useEffect } from 'react'
import type { Page } from '../App'
import {
  getOrders, updateOrderStatus, getProducts, saveProducts,
  getShop, saveShop, formatPrice, type Order, type Product,
} from '../lib/store'
import { PRODUCTS } from '../data/products'

const ADMIN_PIN = '9689'

type Props = { onNavigate: (p: Page) => void }

export function Admin({ onNavigate }: Props) {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState('')
  const [tab, setTab] = useState<'orders' | 'products' | 'settings'>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [shop, setShop] = useState(getShop())

  useEffect(() => {
    if (authed) {
      setOrders(getOrders())
      setProducts(getProducts())
    }
  }, [authed, tab])

  const login = () => {
    if (pin === ADMIN_PIN) setAuthed(true)
    else alert('Wrong PIN')
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream px-4">
        <div className="bg-white border border-border rounded-2xl p-8 w-full max-w-sm shadow-sm">
          <h1 className="font-serif text-2xl text-center mb-6">Admin Login</h1>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Enter PIN"
            className="w-full border border-border rounded-xl px-4 py-3 mb-4 text-center tracking-widest text-lg"
            maxLength={6}
          />
          <button onClick={login} className="w-full bg-madder text-white py-3 rounded-full font-medium">Unlock</button>
          <button onClick={() => onNavigate({ name: 'home' })} className="w-full text-center text-sm text-ink-muted mt-4">
            ← Back to shop
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-ink text-cream px-4 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl">Rayansh Admin</h1>
        <button onClick={() => onNavigate({ name: 'home' })} className="text-sm text-cream/70 hover:text-cream">
          Exit admin
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8">
          {(['orders', 'products', 'settings'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize ${
                tab === t ? 'bg-madder text-white' : 'bg-white border border-border'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl mb-4">Orders ({orders.length})</h2>
            {orders.length === 0 && <p className="text-ink-muted">No orders yet.</p>}
            {orders.map((o) => (
              <div key={o.id} className="bg-white border border-border rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold">{o.id}</p>
                    <p className="text-sm text-ink-muted">{new Date(o.createdAt).toLocaleString('en-IN')}</p>
                  </div>
                  <select
                    value={o.status}
                    onChange={(e) => {
                      updateOrderStatus(o.id, e.target.value as Order['status'])
                      setOrders(getOrders())
                    }}
                    className="border border-border rounded-lg px-3 py-1.5 text-sm"
                  >
                    {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <p className="text-sm"><strong>{o.customer.name}</strong> · {o.customer.phone}</p>
                <p className="text-sm text-ink-muted">{o.customer.address}, {o.customer.pincode}</p>
                <p className="text-sm mt-1">Payment: {o.customer.payment}</p>
                <div className="mt-3 text-sm space-y-1">
                  {o.items.map((i) => (
                    <div key={`${i.productId}-${i.size}`}>
                      {i.name} ({i.size}) × {i.qty} — {formatPrice(i.price * i.qty)}
                    </div>
                  ))}
                </div>
                <p className="font-semibold text-madder mt-2">Total: {formatPrice(o.total)}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl">Products ({products.length})</h2>
              <button
                onClick={() => { saveProducts(PRODUCTS); setProducts(PRODUCTS); alert('Reset to default 8 products') }}
                className="text-sm text-ink-muted border border-border px-3 py-1.5 rounded-lg"
              >
                Reset defaults
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {products.map((p) => (
                <div key={p.id} className="bg-white border border-border rounded-xl p-4 flex gap-4">
                  <img src={p.image} alt="" className="w-20 h-24 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{p.name}</p>
                    <p className="text-madder font-semibold">{formatPrice(p.price)}</p>
                    <p className="text-xs text-ink-muted">{p.fabric} · {p.sizes.join(', ')}</p>
                    <label className="flex items-center gap-2 mt-2 text-sm">
                      <input
                        type="checkbox"
                        checked={p.active}
                        onChange={() => {
                          const next = products.map((x) => x.id === p.id ? { ...x, active: !x.active } : x)
                          saveProducts(next)
                          setProducts(next)
                        }}
                      />
                      Active
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div className="max-w-md">
            <h2 className="font-serif text-2xl mb-6">Shop settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Shop name</label>
                <input value={shop.name} onChange={(e) => setShop({ ...shop, name: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp (with country code)</label>
                <input value={shop.whatsapp} onChange={(e) => setShop({ ...shop, whatsapp: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3" placeholder="919689148028" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input value={shop.city} onChange={(e) => setShop({ ...shop, city: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">UPI ID (optional)</label>
                <input value={shop.upi} onChange={(e) => setShop({ ...shop, upi: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3" />
              </div>
              <button
                onClick={() => { saveShop(shop); alert('Settings saved') }}
                className="bg-madder text-white px-8 py-3 rounded-full font-medium"
              >
                Save settings
              </button>
            </div>
            <p className="text-xs text-ink-muted mt-8">
              Admin PIN: 9689 · Data is stored in this browser for now.
              For multi-device + Neon database, we can upgrade later.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
