import React from 'react';
import { Users, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Mock requests
  const sellerRequests = [
    { id: 1, name: 'متجر السعادة', owner: 'محمود علي', itemsType: 'ديكور', status: 'pending' },
    { id: 2, name: 'أدواتي', owner: 'منى سامي', itemsType: 'مطبخ', status: 'pending' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">لوحة تحكم الإدارة</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Seller Approvals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-6">
             <Users className="text-purple-600" />
             <h2 className="font-bold text-lg">طلبات انضمام التجار</h2>
          </div>
          
          <div className="space-y-4">
            {sellerRequests.map(req => (
              <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div>
                  <div className="font-bold">{req.name}</div>
                  <div className="text-sm text-gray-500">المالك: {req.owner} | النوع: {req.itemsType}</div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-green-600 hover:bg-green-100 rounded-full" title="قبول"><CheckCircle size={20} /></button>
                  <button className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="رفض"><XCircle size={20} /></button>
                </div>
              </div>
            ))}
            {sellerRequests.length === 0 && <p className="text-gray-500">لا توجد طلبات معلقة.</p>}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
           <div className="flex items-center gap-2 mb-6">
             <AlertCircle className="text-orange-500" />
             <h2 className="font-bold text-lg">تنبيهات النظام</h2>
          </div>
          <ul className="space-y-3 text-sm">
             <li className="flex gap-2 items-start">
               <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0"></span>
               <span>مخزون "طقم سكاكين سيراميك" منخفض (3 قطع متبقية)</span>
             </li>
             <li className="flex gap-2 items-start">
               <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></span>
               <span>تم تسجيل 50 عميل جديد اليوم.</span>
             </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
