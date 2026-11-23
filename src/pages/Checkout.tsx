import { useState } from 'react'
import type { Page } from '../App'
import { getCart, getProducts, formatPrice, clearCart, saveOrder, generateOrderId, type Order } from '../lib/store'

type Props = {
  onNavigate: (p: Page) => void
  onCartChange: () => void
}

export function Checkout({ onNavigate, onCartChange }: Props) {
  const cart = getCart()
  const products = getProducts()
  const items = cart.map((c) => {
    const p = products.find((x) => x.id === c.productId)!
    return { ...c, name: p.name, price: p.price, image: p.image }
  }).filter((i) => i.name)
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  const [form, setForm] = useState({
    name: '', phone: '', address: '', pincode: '', payment: 'COD' as 'COD' | 'UPI',
  })
  const [submitting, setSubmitting] = useState(false)

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p>Your bag is empty.</p>
        <button onClick={() => onNavigate({ name: 'shop' })} className="text-madder mt-4">Go to shop</button>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address || !form.pincode) return
    setSubmitting(true)
    const order: Order = {
      id: generateOrderId(),
      items,
      customer: form,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    saveOrder(order)
    clearCart()
    onCartChange()
    onNavigate({ name: 'order', id: order.id })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Full name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-madder/30" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp / Phone *</label>
          <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-madder/30" placeholder="10-digit mobile" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full address *</label>
          <textarea required rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border border-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-madder/30" placeholder="House no, street, landmark, city" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pincode *</label>
          <input required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            className="w-full border border-border rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-madder/30" placeholder="6-digit pincode" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Payment method</label>
          <div className="flex gap-4">
            {(['COD', 'UPI'] as const).map((m) => (
              <label key={m} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={form.payment === m} onChange={() => setForm({ ...form, payment: m })} className="accent-madder" />
                <span>{m === 'COD' ? 'Cash on Delivery' : 'UPI'}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="bg-cream-dark rounded-xl p-5 mt-6">
          <div className="flex justify-between mb-2"><span className="text-ink-muted">Items ({items.length})</span><span>{formatPrice(total)}</span></div>
          <div className="flex justify-between font-semibold text-lg"><span>Total</span><span className="text-madder">{formatPrice(total)}</span></div>
        </div>
        <button type="submit" disabled={submitting}
          className="w-full bg-madder hover:bg-madder-dark text-white py-4 rounded-full font-medium text-lg mt-4 disabled:opacity-60">
          {submitting ? 'Placing order…' : 'Place order'}
        </button>
      </form>
    </div>
  )
}
