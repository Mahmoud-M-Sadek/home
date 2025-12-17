import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../App';
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useAppContext();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);
  const [qty, setQty] = useState(1);

  if (!product) return <div className="p-10 text-center">المنتج غير موجود</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
              <img src={selectedImage || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${selectedImage === img ? 'border-teal-500' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
               <div className="text-sm text-teal-600 font-bold mb-2">{product.category}</div>
               <h1 className="text-3xl font-black text-gray-900 mb-2">{product.name}</h1>
               <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-yellow-500">
                     <Star className="fill-current" size={16} />
                     <span className="font-bold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">{product.reviewsCount} تقييم</span>
                  <span className="text-gray-400">|</span>
                  <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                    {product.stock > 0 ? "متوفر في المخزون" : "نفذت الكمية"}
                  </span>
               </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-teal-700">{product.price} ج.م</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through mb-1">{product.oldPrice} ج.م</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
              {product.description}
            </p>

            <div className="flex gap-4 items-center">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-gray-100 rounded-r-full"><Minus size={16} /></button>
                <span className="w-12 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-gray-100 rounded-l-full"><Plus size={16} /></button>
              </div>
              <button 
                onClick={() => addToCart(product, qty)}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <ShoppingCart size={20} /> أضف للسلة
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Seller Info & Trust Badges */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
               <div className="flex items-center justify-between text-sm">
                 <span className="text-gray-500">يباع بواسطة:</span>
                 <span className="font-bold text-teal-800 underline cursor-pointer">{product.sellerName}</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <Truck size={14} className="text-teal-500" /> شحن سريع خلال 2-4 أيام
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <ShieldCheck size={14} className="text-teal-500" /> ضمان استرجاع 14 يوم
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
