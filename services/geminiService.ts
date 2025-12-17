import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: apiKey });

export const getChatResponse = async (userMessage: string, history: string[]): Promise<string> => {
  try {
    if (!apiKey) return "عذراً، خدمة المحادثة غير متوفرة حالياً (API Key missing).";

    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      أنت مساعد ذكي لمنصة "Homefy - هوميڤاي" للتجارة الإلكترونية في مصر.
      تخصص المنصة: بيع الأدوات المنزلية الخفيفة (مطبخ، تنظيم، ديكور، نظافة).
      
      دورك:
      1. مساعدة العملاء في اختيار المنتجات المناسبة للمنزل.
      2. الرد باللهجة المصرية الودودة أو اللغة العربية الفصحى البسيطة.
      3. كن مختصراً ومفيداً.
      4. إذا سأل العميل عن "طلبي" أو "تتبع الشحنة"، اطلب منه رقم الطلب (Order ID).
      5. العملة المستخدمة هي الجنيه المصري (EGP).
      
      معلومات إضافية:
      - وسائل الدفع: فودافون كاش، فوري، فيزا، الدفع عند الاستلام.
      - الشحن يستغرق 2-4 أيام عمل.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: `History: ${history.join('\n')}` }] },
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "عذراً، لم أتمكن من فهم طلبك.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "حدث خطأ تقني، يرجى المحاولة لاحقاً.";
  }
};