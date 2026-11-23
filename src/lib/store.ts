import { PRODUCTS, type Product } from '../data/products'
export type { Product }

export type CartItem = {
  productId: string
  size: string
  qty: number
}

export type Order = {
  id: string
  items: (CartItem & { name: string; price: number; image: string })[]
  customer: {
    name: string
    phone: string
    address: string
    pincode: string
    payment: 'COD' | 'UPI'
  }
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
}

const CART_KEY = 'rf_cart_v1'
const ORDERS_KEY = 'rf_orders_v1'
const PRODUCTS_KEY = 'rf_products_v1'
const SHOP_KEY = 'rf_shop_v1'

export type ShopSettings = {
  name: string
  whatsapp: string
  city: string
  upi: string
}

const DEFAULT_SHOP: ShopSettings = {
  name: 'Rayansh Fashion',
  whatsapp: '919689148028',
  city: 'Pune',
  upi: '',
}

export function getShop(): ShopSettings {
  try {
    const raw = localStorage.getItem(SHOP_KEY)
    if (raw) return { ...DEFAULT_SHOP, ...JSON.parse(raw) }
  } catch {}
  return DEFAULT_SHOP
}

export function saveShop(shop: Partial<ShopSettings>) {
  const current = getShop()
  localStorage.setItem(SHOP_KEY, JSON.stringify({ ...current, ...shop }))
}

export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS))
  return PRODUCTS
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(productId: string, size: string, qty = 1) {
  const cart = getCart()
  const existing = cart.find((i) => i.productId === productId && i.size === size)
  if (existing) existing.qty += qty
  else cart.push({ productId, size, qty })
  saveCart(cart)
  return cart
}

export function updateCartQty(productId: string, size: string, qty: number) {
  let cart = getCart()
  if (qty <= 0) {
    cart = cart.filter((i) => !(i.productId === productId && i.size === size))
  } else {
    const item = cart.find((i) => i.productId === productId && i.size === size)
    if (item) item.qty = qty
  }
  saveCart(cart)
  return cart
}

export function clearCart() {
  saveCart([])
}

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveOrder(order: Order) {
  const orders = getOrders()
  orders.unshift(order)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function updateOrderStatus(id: string, status: Order['status']) {
  const orders = getOrders()
  const o = orders.find((x) => x.id === id)
  if (o) {
    o.status = status
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }
}

export function generateOrderId() {
  return 'RF-' + Math.floor(1000 + Math.random() * 9000)
}

export function formatPrice(n: number) {
  return '₹' + n.toLocaleString('en-IN')
}

export function whatsappLink(message: string) {
  const shop = getShop()
  return `https://wa.me/${shop.whatsapp}?text=${encodeURIComponent(message)}`
}
