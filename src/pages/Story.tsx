import type { Page } from '../App'

type Props = { onNavigate: (p: Page) => void }

export function Story({ onNavigate }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="font-serif text-4xl mb-6">Our Story</h1>
      <div className="text-ink-muted leading-relaxed space-y-5">
        <p>
          Rayansh Fashion started with a simple idea — bring well-made kurtis from small
          manufacturers directly to you, without the heavy retail markup.
        </p>
        <p>
          We work with trusted workshops that produce limited lots. Each piece is selected
          for fabric quality, fit, and design. When a lot finishes, it finishes.
        </p>
        <p>
          Orders are confirmed on WhatsApp so communication stays personal and clear.
          No complicated apps. Just good clothes and honest prices.
        </p>
      </div>
      <button
        onClick={() => onNavigate({ name: 'shop' })}
        className="mt-10 bg-madder text-white px-8 py-3 rounded-full font-medium"
      >
        Explore the collection
      </button>
    </div>
  )
}
