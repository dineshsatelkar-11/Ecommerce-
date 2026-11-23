import type { Page } from '../App'
import { getOrders, formatPrice, whatsappLink, getShop } from '../lib/store'

type Props = { id: string; onNavigate: (p: Page) => void }

export function OrderConfirm({ id, onNavigate }: Props) {
  const order = getOrders().find((o) => o.id === id)
  const shop = getShop()

  if (!order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p>Order not found</p>
        <button onClick={() => onNavigate({ name: 'home' })} className="text-madder mt-4">Go home</button>
      </div>
    )
  }

  const message = [
    `*New Order – ${shop.name}*`,
    `Order ID: ${order.id}`,
    ``,
    `*Customer*`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Address: ${order.customer.address}`,
    `Pincode: ${order.customer.pincode}`,
    `Payment: ${order.customer.payment}`,
    ``,
    `*Items*`,
    ...order.items.map((i) => `• ${i.name} (${i.size}) × ${i.qty} = ${formatPrice(i.price * i.qty)}`),
    ``,
    `*Total: ${formatPrice(order.total)}*`,
  ].join('\n')

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
      <h1 className="font-serif text-3xl mb-2">Order placed!</h1>
      <p className="text-ink-muted mb-1">Order ID: <strong>{order.id}</strong></p>
      <p className="text-ink-muted mb-8">We will confirm on WhatsApp shortly.</p>
      <div className="bg-cream-dark rounded-2xl p-6 text-left mb-8">
        <h3 className="font-medium mb-3">Order summary</h3>
        {order.items.map((i) => (
          <div key={`${i.productId}-${i.size}`} className="flex justify-between text-sm py-1">
            <span>{i.name} ({i.size}) × {i.qty}</span>
            <span>{formatPrice(i.price * i.qty)}</span>
          </div>
        ))}
        <div className="border-t border-border mt-3 pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-madder">{formatPrice(order.total)}</span>
        </div>
      </div>
      <a href={whatsappLink(message)} target="_blank" rel="noreferrer"
        className="block w-full bg-[#25D366] hover:bg-[#1da851] text-white py-4 rounded-full font-medium text-lg mb-3">
        Open WhatsApp to confirm
      </a>
      <button onClick={() => navigator.clipboard.writeText(message)} className="text-sm text-ink-muted hover:text-madder">
        Copy order message
      </button>
      <button onClick={() => onNavigate({ name: 'shop' })} className="block mx-auto mt-8 text-madder font-medium">
        Continue shopping
      </button>
    </div>
  )
}
