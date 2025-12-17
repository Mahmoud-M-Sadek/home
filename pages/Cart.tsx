import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { Trash2, ArrowLeft } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useAppContext();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 500 ? 0 : 50;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800">سلة التسوق فارغة</h2>
        <p className="text-gray-500">لم تقم بإضافة أي منتجات بعد.</p>
        <Link to="/" className="bg-teal-600 text-white px-6 py-2 rounded-full font-bold hover:bg-teal-700">تصفح المنتجات</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">سلة التسوق ({cart.length} منتجات)</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
              <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <div className="text-sm text-gray-500 mb-2">البائع: {item.sellerName}</div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-teal-700">{item.price} ج.م × {item.quantity}</div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4">ملخص الطلب</h3>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>المجموع الفرعي</span>
                <span>{total} ج.م</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>مصاريف الشحن</span>
                <span>{shipping === 0 ? 'مجاني' : `${shipping} ج.م`}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                <span>الإجمالي</span>
                <span>{total + shipping} ج.م</span>
              </div>
            </div>
            <Link to="/checkout" className="block w-full bg-teal-600 text-white text-center py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">
              إتمام الشراء
            </Link>
            <div className="mt-4 text-xs text-gray-400 text-center">
              نقبل الدفع عبر فودافون كاش، فوري، والبطاقات البنكية
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
