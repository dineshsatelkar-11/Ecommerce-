import type { Page } from '../App'
import { getCart, getProducts, updateCartQty, formatPrice } from '../lib/store'

type Props = {
  onNavigate: (p: Page) => void
  onCartChange: () => void
}

export function Bag({ onNavigate, onCartChange }: Props) {
  const cart = getCart()
  const products = getProducts()
  const items = cart.map((c) => {
    const p = products.find((x) => x.id === c.productId)!
    return { ...c, product: p, lineTotal: p.price * c.qty }
  }).filter((i) => i.product)
  const total = items.reduce((s, i) => s + i.lineTotal, 0)

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl mb-3">Your bag is empty</h1>
        <p className="text-ink-muted mb-8">Add some kurtis to get started.</p>
        <button onClick={() => onNavigate({ name: 'shop' })} className="bg-madder text-white px-8 py-3 rounded-full font-medium">
          Browse shop
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl mb-8">Your bag</h1>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex gap-4 border-b border-border pb-6">
            <img src={item.product.image} alt={item.product.name} className="w-24 h-32 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-sm text-ink-muted mt-0.5">Size: {item.size}</p>
              <p className="text-madder font-semibold mt-1">{formatPrice(item.product.price)}</p>
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => { updateCartQty(item.productId, item.size, item.qty - 1); onCartChange() }}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
                >−</button>
                <span className="w-6 text-center">{item.qty}</span>
                <button
                  onClick={() => { updateCartQty(item.productId, item.size, item.qty + 1); onCartChange() }}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
                >+</button>
              </div>
            </div>
            <p className="font-semibold">{formatPrice(item.lineTotal)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t border-border pt-6">
        <div className="flex justify-between text-lg font-semibold mb-6">
          <span>Total</span>
          <span className="text-madder">{formatPrice(total)}</span>
        </div>
        <button
          onClick={() => onNavigate({ name: 'checkout' })}
          className="w-full bg-madder hover:bg-madder-dark text-white py-4 rounded-full font-medium text-lg"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}
