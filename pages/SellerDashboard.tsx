import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Package, PlusCircle, DollarSign, TrendingUp, Archive } from 'lucide-react';
import { Product } from '../types';

const SellerDashboard: React.FC = () => {
  const { user, products, addProduct } = useAppContext();
  const [activeTab, setActiveTab] = useState('products');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', category: 'أدوات المطبخ', price: 0, description: '', stock: 0
  });

  const sellerProducts = products.filter(p => p.sellerId === user?.id);
  const totalSales = 15400; // Mock data

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !user) return;
    
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name!,
      category: newProduct.category || 'أدوات المطبخ',
      price: Number(newProduct.price),
      description: newProduct.description || '',
      stock: Number(newProduct.stock),
      sellerId: user.id,
      sellerName: user.storeName || user.name,
      images: ['https://picsum.photos/400/400'], // Placeholder
      rating: 0,
      reviewsCount: 0
    };

    addProduct(product);
    setShowAddModal(false);
    setNewProduct({ name: '', category: 'أدوات المطبخ', price: 0, description: '', stock: 0 });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">
                 {user?.storeName?.charAt(0)}
               </div>
               <div>
                 <div className="font-bold text-gray-900">{user?.storeName}</div>
                 <div className="text-xs text-gray-500">تاجر موثوق ✅</div>
               </div>
            </div>
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('products')} className={`w-full text-right px-4 py-2 rounded-lg ${activeTab === 'products' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
                المنتجات
              </button>
              <button onClick={() => setActiveTab('orders')} className={`w-full text-right px-4 py-2 rounded-lg ${activeTab === 'orders' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
                الطلبات
              </button>
              <button onClick={() => setActiveTab('finance')} className={`w-full text-right px-4 py-2 rounded-lg ${activeTab === 'finance' ? 'bg-teal-50 text-teal-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}>
                المحفظة
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full"><Package /></div>
              <div>
                <div className="text-2xl font-bold">{sellerProducts.length}</div>
                <div className="text-sm text-gray-500">منتج نشط</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full"><DollarSign /></div>
              <div>
                <div className="text-2xl font-bold">{totalSales} ج.م</div>
                <div className="text-sm text-gray-500">إجمالي المبيعات</div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-full"><TrendingUp /></div>
              <div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-gray-500">تقييم المتجر</div>
              </div>
            </div>
          </div>

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">المنتجات الخاصة بي</h3>
                <button onClick={() => setShowAddModal(true)} className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-teal-700">
                  <PlusCircle size={16} /> إضافة منتج
                </button>
              </div>
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-gray-500 text-sm">
                  <tr>
                    <th className="p-4 font-medium">المنتج</th>
                    <th className="p-4 font-medium">السعر</th>
                    <th className="p-4 font-medium">المخزون</th>
                    <th className="p-4 font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sellerProducts.map(p => (
                    <tr key={p.id}>
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images[0]} className="w-10 h-10 rounded bg-gray-200" alt="" />
                        <span className="font-medium">{p.name}</span>
                      </td>
                      <td className="p-4">{p.price} ج.م</td>
                      <td className="p-4">{p.stock}</td>
                      <td className="p-4"><span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">نشط</span></td>
                    </tr>
                  ))}
                  {sellerProducts.length === 0 && (
                     <tr><td colSpan={4} className="p-8 text-center text-gray-400">لا توجد منتجات. أضف منتجك الأول!</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'orders' && (
             <div className="bg-white p-12 rounded-xl text-center text-gray-500">
               <Archive size={48} className="mx-auto mb-4 opacity-20" />
               <p>لا توجد طلبات جديدة حالياً.</p>
             </div>
          )}
        </div>
      </div>

      {/* Add Product Modal (Simple) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 animate-in fade-in zoom-in">
            <h3 className="text-xl font-bold mb-4">إضافة منتج منزلي جديد</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">اسم المنتج</label>
                <input type="text" className="w-full border rounded-lg p-2" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">السعر (ج.م)</label>
                  <input type="number" className="w-full border rounded-lg p-2" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">المخزون</label>
                  <input type="number" className="w-full border rounded-lg p-2" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium mb-1">القسم</label>
                 <select className="w-full border rounded-lg p-2" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                   <option>أدوات المطبخ</option>
                   <option>تنظيم وتخزين</option>
                   <option>ديكور منزلي</option>
                 </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">الوصف</label>
                <textarea className="w-full border rounded-lg p-2 h-24" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">نشر المنتج</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SellerDashboard;
