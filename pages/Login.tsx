import React from 'react';
import { useAppContext } from '../App';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    if (role === UserRole.SELLER) navigate('/seller');
    else if (role === UserRole.ADMIN) navigate('/admin');
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <Home className="w-16 h-16 text-teal-600 mb-2" />
        <h1 className="text-3xl font-black text-gray-800">هوميڤاي</h1>
        <p className="text-gray-500">بوابة الدخول</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center mb-6">اختر نوع الحساب (تجريبي)</h2>
        
        <button 
          onClick={() => handleLogin(UserRole.CUSTOMER)}
          className="w-full p-4 border border-teal-200 rounded-xl hover:bg-teal-50 hover:border-teal-500 transition-all flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg group-hover:bg-teal-600 group-hover:text-white transition-colors">C</div>
          <div className="text-right">
            <div className="font-bold text-gray-800">عميل (Customer)</div>
            <div className="text-xs text-gray-500">تسوق للمنزل والمطبخ</div>
          </div>
        </button>

        <button 
          onClick={() => handleLogin(UserRole.SELLER)}
          className="w-full p-4 border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">S</div>
          <div className="text-right">
            <div className="font-bold text-gray-800">تاجر (Seller)</div>
            <div className="text-xs text-gray-500">بيع منتجات منزلية</div>
          </div>
        </button>

        <button 
          onClick={() => handleLogin(UserRole.ADMIN)}
          className="w-full p-4 border border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-500 transition-all flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">A</div>
          <div className="text-right">
            <div className="font-bold text-gray-800">مدير (Admin)</div>
            <div className="text-xs text-gray-500">إدارة المنصة</div>
          </div>
        </button>

      </div>
      
      <p className="mt-8 text-xs text-gray-400 font-bold text-center">© 2025 mahmoud sadek | +201030417663</p>
    </div>
  );
};

export default Login;