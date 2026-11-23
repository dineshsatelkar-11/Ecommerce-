import type { Page } from '../App'
import { getProducts, formatPrice } from '../lib/store'

type Props = { onNavigate: (p: Page) => void }

export function Home({ onNavigate }: Props) {
  const products = getProducts().filter((p) => p.active).slice(0, 4)

  return (
    <div>
      <section className="relative bg-cream-dark overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-brass font-medium tracking-widest text-sm uppercase mb-3">New season · Small lots</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-ink mb-5">
              Kurtis made with care, <span className="text-madder">sold with honesty</span>
            </h1>
            <p className="text-ink-muted text-lg mb-8 max-w-md">
              Direct from small manufacturers. Limited pieces. Fair prices. Order on WhatsApp.
            </p>
            <button
              onClick={() => onNavigate({ name: 'shop' })}
              className="bg-madder hover:bg-madder-dark text-white px-8 py-3.5 rounded-full font-medium transition shadow-sm"
            >
              Shop the collection
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=700&h=800&fit=crop"
              alt="Kurti"
              className="rounded-2xl shadow-xl object-cover w-full aspect-[4/5] max-h-[480px]"
            />
            <div className="absolute -bottom-4 -left-4 bg-brass text-ink px-5 py-2 rounded-full text-sm font-medium shadow">
              From ₹799
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl text-ink">Featured kurtis</h2>
            <p className="text-ink-muted mt-1">Handpicked from recent lots</p>
          </div>
          <button onClick={() => onNavigate({ name: 'shop' })} className="text-madder font-medium text-sm hover:underline">
            View all →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <button key={p.id} onClick={() => onNavigate({ name: 'product', id: p.id })} className="group text-left">
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-cream-dark mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <h3 className="font-medium text-sm leading-snug">{p.name}</h3>
              <p className="text-madder font-semibold mt-1">{formatPrice(p.price)}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-cream-dark py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-center mb-10">Why Rayansh Fashion</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Small manufacturer lots', desc: 'Limited quantities from trusted workshops. Fresh designs every few weeks.' },
              { title: 'Fair pricing', desc: 'No heavy branding markup. Quality fabric at honest prices.' },
              { title: 'WhatsApp ordering', desc: 'Simple checkout. Confirm on WhatsApp. Easy communication.' },
            ].map((item) => (
              <div key={item.title} className="bg-cream rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-lg mb-2 text-madder">{item.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
