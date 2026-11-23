import { useState, useEffect } from 'react'
import { getCart, getShop } from './lib/store'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { ProductPage } from './pages/ProductPage'
import { Bag } from './pages/Bag'
import { Checkout } from './pages/Checkout'
import { OrderConfirm } from './pages/OrderConfirm'
import { Admin } from './pages/Admin'
import { Story } from './pages/Story'

export type Page =
  | { name: 'home' }
  | { name: 'shop' }
  | { name: 'product'; id: string }
  | { name: 'bag' }
  | { name: 'checkout' }
  | { name: 'order'; id: string }
  | { name: 'admin' }
  | { name: 'story' }

export default function App() {
  const [page, setPage] = useState<Page>({ name: 'home' })
  const [cartCount, setCartCount] = useState(0)
  const [shopName, setShopName] = useState('Rayansh Fashion')

  useEffect(() => {
    const cart = getCart()
    setCartCount(cart.reduce((s, i) => s + i.qty, 0))
    setShopName(getShop().name)
  }, [page])

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo(0, 0)
  }

  const refreshCart = () => {
    const cart = getCart()
    setCartCount(cart.reduce((s, i) => s + i.qty, 0))
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      {page.name !== 'admin' && (
        <Header shopName={shopName} cartCount={cartCount} onNavigate={navigate} />
      )}
      <main className="flex-1">
        {page.name === 'home' && <Home onNavigate={navigate} />}
        {page.name === 'shop' && <Shop onNavigate={navigate} />}
        {page.name === 'product' && (
          <ProductPage id={page.id} onNavigate={navigate} onCartChange={refreshCart} />
        )}
        {page.name === 'bag' && <Bag onNavigate={navigate} onCartChange={refreshCart} />}
        {page.name === 'checkout' && (
          <Checkout onNavigate={navigate} onCartChange={refreshCart} />
        )}
        {page.name === 'order' && <OrderConfirm id={page.id} onNavigate={navigate} />}
        {page.name === 'story' && <Story onNavigate={navigate} />}
        {page.name === 'admin' && <Admin onNavigate={navigate} />}
      </main>
      {page.name !== 'admin' && <Footer onNavigate={navigate} />}
    </div>
  )
}
