import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import SupportChat from './components/SupportChat';
import { CATEGORIES, MOCK_PRODUCTS, MOCK_USER_CUSTOMER, MOCK_USER_SELLER, MOCK_USER_ADMIN } from './constants';
import { Product, User, UserRole, CartItem, Order } from './types';

// --- Pages Imports (Inline for simplicity in single file request, normally separate) ---
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';

// --- Context Definition ---
interface AppContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const login = (role: UserRole) => {
    switch (role) {
      case UserRole.SELLER: setUser(MOCK_USER_SELLER); break;
      case UserRole.ADMIN: setUser(MOCK_USER_ADMIN); break;
      default: setUser(MOCK_USER_CUSTOMER); break;
    }
  };

  const logout = () => {
    setUser(null);
    // In real app, clear tokens
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  return (
    <AppContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart, products, addProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// --- Main App Component ---

const LayoutWrapper: React.FC = () => {
  const { user, cart, logout } = useAppContext();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        userRole={user?.role || UserRole.GUEST} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onLogout={() => { logout(); navigate('/'); }}
        onLogin={() => navigate('/login')}
      />
      <main className="flex-grow">
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/seller" element={user?.role === UserRole.SELLER ? <SellerDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} />
         </Routes>
      </main>
      <Footer />
      <SupportChat />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <LayoutWrapper />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
