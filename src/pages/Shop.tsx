import { useState } from 'react'
import type { Page } from '../App'
import { getProducts, formatPrice } from '../lib/store'

type Props = { onNavigate: (p: Page) => void }

export function Shop({ onNavigate }: Props) {
  const all = getProducts().filter((p) => p.active)
  const [fabric, setFabric] = useState('All')
  const fabrics = ['All', ...Array.from(new Set(all.map((p) => p.fabric)))]
  const filtered = fabric === 'All' ? all : all.filter((p) => p.fabric === fabric)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl">Shop kurtis</h1>
        <p className="text-ink-muted mt-1">{filtered.length} pieces available</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {fabrics.map((f) => (
          <button
            key={f}
            onClick={() => setFabric(f)}
            className={`px-4 py-1.5 rounded-full text-sm border transition ${
              fabric === f ? 'bg-madder text-white border-madder' : 'border-border text-ink-muted hover:border-madder'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((p) => (
          <button key={p.id} onClick={() => onNavigate({ name: 'product', id: p.id })} className="group text-left">
            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-cream-dark mb-3">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <p className="text-xs text-ink-muted uppercase tracking-wide">{p.fabric}</p>
            <h3 className="font-medium text-sm mt-0.5 leading-snug">{p.name}</h3>
            <p className="text-madder font-semibold mt-1">{formatPrice(p.price)}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
