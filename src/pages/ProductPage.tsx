import { useState } from 'react'
import type { Page } from '../App'
import { getProducts, addToCart, formatPrice } from '../lib/store'

type Props = {
  id: string
  onNavigate: (p: Page) => void
  onCartChange: () => void
}

export function ProductPage({ id, onNavigate, onCartChange }: Props) {
  const product = getProducts().find((p) => p.id === id)
  const [size, setSize] = useState(product?.sizes[0] || 'M')
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p>Product not found</p>
        <button onClick={() => onNavigate({ name: 'shop' })} className="text-madder mt-4">Back to shop</button>
      </div>
    )
  }

  const handleAdd = () => {
    addToCart(product.id, size)
    onCartChange()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button onClick={() => onNavigate({ name: 'shop' })} className="text-sm text-ink-muted hover:text-madder mb-6">
        ← Back to shop
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cream-dark">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-brass mb-2">{product.fabric} · {product.color}</p>
          <h1 className="font-serif text-3xl md:text-4xl mb-3">{product.name}</h1>
          <p className="text-2xl font-semibold text-madder mb-6">{formatPrice(product.price)}</p>
          <p className="text-ink-muted leading-relaxed mb-8">{product.description}</p>
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Select size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 rounded-full border text-sm font-medium transition ${
                    size === s ? 'bg-madder text-white border-madder' : 'border-border hover:border-madder'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleAdd} className="flex-1 bg-madder hover:bg-madder-dark text-white py-3.5 rounded-full font-medium transition">
              {added ? 'Added to bag ✓' : 'Add to bag'}
            </button>
            <button
              onClick={() => { addToCart(product.id, size); onCartChange(); onNavigate({ name: 'checkout' }) }}
              className="flex-1 border border-madder text-madder py-3.5 rounded-full font-medium hover:bg-madder/5 transition"
            >
              Buy now
            </button>
          </div>
          {product.lot && <p className="text-xs text-ink-muted mt-6">From {product.lot} · Limited stock</p>}
        </div>
      </div>
    </div>
  )
}
