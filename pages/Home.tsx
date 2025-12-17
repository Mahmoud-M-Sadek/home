import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { useAppContext } from '../App';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';

const Home: React.FC = () => {
  const { products, addToCart } = useAppContext();

  // Filter lists
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNewArrival);

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="bg-teal-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center md:text-right md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              جددي بيتك مع <br/>
              <span className="text-orange-400">أحدث الأدوات المنزلية</span>
            </h1>
            <p className="text-lg text-teal-100 max-w-lg mx-auto md:mx-0">
              كل اللي يحتاجه مطبخك وبيتك في مكان واحد. تنظيم، نظافة، وديكور بأفضل الأسعار في مصر.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
              تسوقي الآن
            </button>
          </div>
          <div className="md:w-1/2">
             <img 
               src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800" 
               alt="Kitchen Tools" 
               className="rounded-2xl shadow-2xl border-4 border-white/20"
             />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <ShoppingBag className="text-teal-600" /> تسوقي بالأقسام
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:shadow-md hover:border-teal-200 transition-all">
              <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="font-bold text-gray-700 group-hover:text-teal-600 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">الأكثر مبيعاً 🔥</h2>
          <Link to="/best-sellers" className="text-teal-600 font-medium hover:underline flex items-center">عرض الكل <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* Featured Banner */}
      <section className="container mx-auto px-4">
        <div className="bg-orange-50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 border border-orange-100">
           <div className="md:w-1/2 space-y-4">
             <span className="bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded">عرض خاص</span>
             <h3 className="text-3xl font-bold text-gray-800">طقم تنظيم التوابل التركي</h3>
             <p className="text-gray-600">نظمي مطبخك بأشيك طقم توابل 12 قطعة بغطاء محكم. متاح الآن بخصم 20% لفترة محدودة.</p>
             <button className="text-orange-600 font-bold hover:underline">اكتشفي المزيد &larr;</button>
           </div>
           <div className="md:w-1/2 flex justify-center">
              <img src="https://picsum.photos/seed/spice/400/250" alt="Featured" className="rounded-lg shadow-md" />
           </div>
        </div>
      </section>

       {/* All Products (Simplified) */}
       <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">وصل حديثاً</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.concat(products.filter(p => !p.isBestSeller && !p.isNewArrival)).slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>

    </div>
  );
};

// Helper Component (Internal)
const ProductCard: React.FC<{product: any, onAdd: any}> = ({ product, onAdd }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group relative">
    {product.oldPrice && (
      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
        خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
      </span>
    )}
    <div className="relative h-48 overflow-hidden bg-gray-100">
      <Link to={`/product/${product.id}`}>
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </Link>
      <button 
        onClick={() => onAdd(product)}
        className="absolute bottom-2 left-2 bg-white text-teal-600 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:bg-teal-600 hover:text-white"
      >
        <ShoppingBag size={18} />
      </button>
    </div>
    <div className="p-4">
      <div className="text-xs text-gray-500 mb-1">{product.category}</div>
      <Link to={`/product/${product.id}`} className="block font-bold text-gray-800 mb-2 truncate hover:text-teal-600">{product.name}</Link>
      <div className="flex items-center gap-1 mb-2">
         <Star size={12} className="text-yellow-400 fill-current" />
         <span className="text-xs text-gray-600 font-bold">{product.rating}</span>
         <span className="text-xs text-gray-400">({product.reviewsCount})</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
           <span className="font-bold text-teal-700 text-lg">{product.price} ج.م</span>
           {product.oldPrice && <span className="text-xs text-gray-400 line-through">{product.oldPrice} ج.م</span>}
        </div>
        <div className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded">
           بائع: {product.sellerName}
        </div>
      </div>
    </div>
  </div>
);

export default Home;
