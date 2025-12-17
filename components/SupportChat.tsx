import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'أهلاً بك في هوميڤاي! 🏠 إزاي أقدر أساعدك النهاردة في تجهيز بيتك؟' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const history = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`);
    const aiResponse = await getChatResponse(userMsg, history);

    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4" dir="rtl">
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-teal-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">مساعد هوميڤاي الذكي</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-teal-700 p-1 rounded">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-orange-500' : 'bg-teal-600'} text-white`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-orange-100 text-gray-800 rounded-tr-none' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                  <Bot size={14} className="text-white animate-pulse" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border text-xs text-gray-400">
                  جاري الكتابة...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب استفسارك هنا..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 disabled:opacity-50"
            >
              <Send size={18} className={loading ? "" : "ml-0.5"} /> 
              {/* ml-0.5 because of RTL icon alignment visually */}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default SupportChat;
