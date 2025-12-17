import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Home, LogOut, LayoutDashboard, Truck, Heart } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  cartCount: number;
  onLogout: () => void;
  onLogin: () => void;
}

export const Header: React.FC<LayoutProps> = ({ userRole, cartCount, onLogout, onLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter or navigate
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-teal-700 text-white text-xs py-1 text-center hidden sm:block">
        شحن مجاني للطلبات فوق ٥٠٠ جنيه لفترة محدودة! 🚚
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Home className="text-teal-600 w-8 h-8 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-[8px] px-1 rounded-full font-bold">H</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-800 leading-none">هوميڤاي</span>
              <span className="text-[10px] text-teal-600 font-bold tracking-widest uppercase">Homefy</span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xl relative mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <input 
                type="text" 
                placeholder="بتحور على إيه لبيتك؟ (منظمات، أدوات مطبخ...)" 
                className="w-full bg-gray-100 border-none rounded-full py-2.5 pr-4 pl-12 text-sm focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
              />
              <button type="submit" className="absolute left-1 top-1/2 -translate-y-1/2 p-1.5 bg-teal-600 rounded-full text-white hover:bg-teal-700">
                <Search size={16} />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            {userRole === UserRole.GUEST ? (
              <button onClick={onLogin} className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-teal-600">
                <User size={20} />
                <span className="hidden sm:inline">دخول / تسجيل</span>
              </button>
            ) : (
              <div className="flex items-center gap-4">
                {userRole === UserRole.SELLER && (
                  <Link to="/seller" className="text-teal-600 text-sm font-bold flex items-center gap-1 bg-teal-50 px-3 py-1 rounded-full hover:bg-teal-100">
                    <LayoutDashboard size={16} /> لوحة التاجر
                  </Link>
                )}
                {userRole === UserRole.ADMIN && (
                   <Link to="/admin" className="text-purple-600 text-sm font-bold flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full hover:bg-purple-100">
                    <LayoutDashboard size={16} /> الإدارة
                  </Link>
                )}
                {userRole === UserRole.CUSTOMER && (
                   <Link to="/profile" className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-teal-600">
                     <User size={20} />
                  </Link>
                )}
                 <button onClick={onLogout} className="text-gray-400 hover:text-red-500" title="تسجيل خروج">
                    <LogOut size={20} />
                </button>
              </div>
            )}

            <Link to="/cart" className="relative text-gray-600 hover:text-teal-600 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

             {/* Mobile Menu Toggle */}
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600">
               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 md:hidden">
            <input 
              type="text" 
              placeholder="ابحث عن منتجات..." 
              className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 text-sm"
            />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">
          <Link to="/" className="block py-2 text-gray-700 font-medium">الرئيسية</Link>
          <Link to="/category/kitchen" className="block py-2 text-gray-700">المطبخ</Link>
          <Link to="/category/storage" className="block py-2 text-gray-700">التنظيم</Link>
          <hr />
          <Link to="/track-order" className="flex items-center gap-2 py-2 text-gray-600">
             <Truck size={18} /> تتبع طلبك
          </Link>
          <Link to="/wishlist" className="flex items-center gap-2 py-2 text-gray-600">
             <Heart size={18} /> المفضلة
          </Link>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Home className="text-teal-500" />
               <span className="text-xl font-bold">هوميڤاي</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصتك الأولى في مصر لكل ما يحتاجه بيتك العصري. منتجات مختارة بعناية لتجعل حياتك أسهل وأجمل.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-500">أقسام التسوق</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">أدوات المطبخ</a></li>
              <li><a href="#" className="hover:text-white">التنظيم والتخزين</a></li>
              <li><a href="#" className="hover:text-white">الديكور</a></li>
              <li><a href="#" className="hover:text-white">أدوات التنظيف</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-500">خدمة العملاء</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">تتبع الطلب</a></li>
              <li><a href="#" className="hover:text-white">سياسة الاسترجاع</a></li>
              <li><a href="#" className="hover:text-white">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-white">اتصل بنا</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-500">طرق الدفع</h3>
            <div className="flex gap-2 mb-4">
               {/* Simulating Payment Icons */}
               <div className="bg-white text-red-600 px-2 py-1 text-xs font-bold rounded">Vodafone</div>
               <div className="bg-white text-blue-800 px-2 py-1 text-xs font-bold rounded">Fawry</div>
               <div className="bg-white text-gray-800 px-2 py-1 text-xs font-bold rounded">Cash</div>
            </div>
            <p className="text-xs text-gray-500">© 2024 Homefy Egypt. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
