export type Product = {
  id: string
  name: string
  price: number
  fabric: string
  color: string
  sizes: string[]
  description: string
  image: string
  lot?: string
  active: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: "rf-001",
    name: "Ivory Floral Cotton Kurti",
    price: 899,
    fabric: "Cotton",
    color: "Ivory",
    sizes: ["S", "M", "L", "XL"],
    description: "Soft cotton kurti with delicate floral print. Perfect for daily wear and light occasions.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    lot: "Lot A",
    active: true,
  },
  {
    id: "rf-002",
    name: "Madder Red Block Print",
    price: 1099,
    fabric: "Cotton",
    color: "Madder Red",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Classic block print in rich madder red. Handcrafted feel with modern silhouette.",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
    lot: "Lot B",
    active: true,
  },
  {
    id: "rf-003",
    name: "Mustard Yellow Straight Kurti",
    price: 799,
    fabric: "Rayon",
    color: "Mustard",
    sizes: ["M", "L", "XL"],
    description: "Bright mustard rayon kurti. Comfortable and easy to style with leggings or jeans.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
    lot: "Lot A",
    active: true,
  },
  {
    id: "rf-004",
    name: "Indigo Blue A-Line",
    price: 1299,
    fabric: "Cotton",
    color: "Indigo",
    sizes: ["S", "M", "L", "XL"],
    description: "Elegant indigo A-line kurti with subtle embroidery near the neckline.",
    image: "https://images.unsplash.com/photo-1583391733981-8b530b6e6b0c?w=600&h=800&fit=crop",
    lot: "Lot C",
    active: true,
  },
  {
    id: "rf-005",
    name: "Cream Embroidered Kurti",
    price: 1499,
    fabric: "Cotton Silk",
    color: "Cream",
    sizes: ["S", "M", "L"],
    description: "Premium cream kurti with fine embroidery. Ideal for festive and formal looks.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    lot: "Lot D",
    active: true,
  },
  {
    id: "rf-006",
    name: "Olive Green Casual",
    price: 849,
    fabric: "Cotton",
    color: "Olive",
    sizes: ["S", "M", "L", "XL"],
    description: "Everyday olive green kurti. Soft fabric, relaxed fit, pairs well with denim.",
    image: "https://images.unsplash.com/photo-1572804013305-851af67f8978?w=600&h=800&fit=crop",
    lot: "Lot B",
    active: true,
  },
  {
    id: "rf-007",
    name: "Pink Floral Anarkali Style",
    price: 1399,
    fabric: "Georgette",
    color: "Pink",
    sizes: ["M", "L", "XL"],
    description: "Flowing pink floral anarkali-inspired kurti. Lightweight and graceful.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    lot: "Lot E",
    active: true,
  },
  {
    id: "rf-008",
    name: "Black Gold Accent Kurti",
    price: 1199,
    fabric: "Rayon",
    color: "Black",
    sizes: ["S", "M", "L", "XL"],
    description: "Sleek black kurti with subtle gold accents. Modern and versatile.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
    lot: "Lot C",
    active: true,
  },
]
