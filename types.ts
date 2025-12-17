export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  storeName?: string; // Only for sellers
  balance?: number; // For sellers
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  description: string;
  images: string[];
  sellerId: string;
  sellerName: string; // 'Homefy' or seller name
  stock: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  date: string;
  paymentMethod: 'Vodafone Cash' | 'Fawry' | 'Credit Card' | 'COD';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
