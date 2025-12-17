import React, { useState } from 'react';
import { useAppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
      setStep(3);
      clearCart();
    }, 1500);
  };

  if (step === 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">تم استلام طلبك بنجاح!</h2>
        <p className="text-gray-500 mb-6">رقم الطلب #ORD-2024-8854. سيتم التواصل معك قريباً لتأكيد الموعد.</p>
        <button onClick={() => navigate('/')} className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold">العودة للرئيسية</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 flex items-center justify-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>1</div>
        <div className={`w-20 h-1 ${step >= 2 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>2</div>
        <div className={`w-20 h-1 ${step >= 3 ? 'bg-teal-600' : 'bg-gray-200'}`}></div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>3</div>
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">بيانات التوصيل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="الاسم بالكامل" className="border p-3 rounded-lg w-full bg-gray-50" defaultValue="أحمد محمد" />
              <input type="text" placeholder="رقم الموبايل" className="border p-3 rounded-lg w-full bg-gray-50" />
              <input type="text" placeholder="المحافظة" className="border p-3 rounded-lg w-full bg-gray-50" />
              <input type="text" placeholder="المدينة / المنطقة" className="border p-3 rounded-lg w-full bg-gray-50" />
              <textarea placeholder="العنوان بالتفصيل (اسم الشارع، رقم العمارة، الشقة)" className="border p-3 rounded-lg w-full bg-gray-50 md:col-span-2 h-24"></textarea>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold mt-4">متابعة للدفع</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">طريقة الدفع</h2>
            <div className="space-y-3">
              
              <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'vodafone' ? 'border-red-500 bg-red-50' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="payment" value="vodafone" checked={paymentMethod === 'vodafone'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-red-600" />
                <div className="flex-1">
                   <div className="font-bold text-gray-800">فودافون كاش</div>
                   <div className="text-xs text-gray-500">ادفع بسهولة من محفظتك الإلكترونية</div>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'fawry' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="payment" value="fawry" checked={paymentMethod === 'fawry'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                   <div className="font-bold text-gray-800">فوري (Fawry Pay)</div>
                   <div className="text-xs text-gray-500">ادفع عن طريق كود مرجعي في أي ماكينة فوري</div>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-teal-500 bg-teal-50' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-teal-600" />
                <div className="flex-1">
                   <div className="font-bold text-gray-800">بطاقة بنكية</div>
                   <div className="text-xs text-gray-500">فيزا / ماستركارد (مؤمن بواسطة Paymob)</div>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-gray-500 bg-gray-50' : 'hover:bg-gray-50'}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                   <div className="font-bold text-gray-800">الدفع عند الاستلام</div>
                   <div className="text-xs text-gray-500">ادفع نقداً لمندوب الشحن عند استلام الطلب</div>
                </div>
              </label>

            </div>
            
            <div className="flex gap-4 pt-4">
               <button onClick={() => setStep(1)} className="w-1/3 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold">رجوع</button>
               <button onClick={handlePlaceOrder} className="w-2/3 bg-teal-600 text-white py-3 rounded-lg font-bold">تأكيد الطلب</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
