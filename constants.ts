import { Category, Product, User, UserRole } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'أدوات المطبخ', icon: '🍳' },
  { id: '2', name: 'تنظيم وتخزين', icon: '📦' },
  { id: '3', name: 'ديكور منزلي', icon: '🖼️' },
  { id: '4', name: 'أدوات تنظيف', icon: '🧹' },
  { id: '5', name: 'حمام وغسيل', icon: '🛁' },
  { id: '6', name: 'إلكترونيات صغيرة', icon: '🔌' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '101',
    name: 'طقم منظم ثلاجة ٦ قطع',
    category: 'تنظيم وتخزين',
    price: 250,
    oldPrice: 350,
    description: 'طقم علب تنظيم شفاف عالي الجودة للحفاظ على الخضروات والفاكهة طازجة وتوفير مساحة في الثلاجة.',
    images: [
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1544233726-b2b3ca939941?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'homefy',
    sellerName: 'Homefy Official',
    stock: 50,
    rating: 4.8,
    reviewsCount: 120,
    isBestSeller: true,
  },
  {
    id: '102',
    name: 'ممسحة أرضيات ذكية مع دلو',
    category: 'أدوات تنظيف',
    price: 450,
    oldPrice: 600,
    description: 'ممسحة مسطحة ميكروفايبر تدور ٣٦٠ درجة مع دلو للعصر الذاتي، تجعل التنظيف أسرع وأسهل.',
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'],
    sellerId: 's1',
    sellerName: 'بيت العز',
    stock: 20,
    rating: 4.5,
    reviewsCount: 45,
    isNewArrival: true,
  },
  {
    id: '103',
    name: 'قطاعة خضروات يدوية متعددة الوظائف',
    category: 'أدوات المطبخ',
    price: 180,
    description: 'قطاعة آمنة وسريعة لتقطيع الخضروات والفواكه بأشكال مختلفة بلمح البصر دون مجهود.',
    images: ['https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=600'],
    sellerId: 's2',
    sellerName: 'مطبخي',
    stock: 100,
    rating: 4.2,
    reviewsCount: 89,
  },
  {
    id: '104',
    name: 'رف حمام زاوية لاصق',
    category: 'حمام وغسيل',
    price: 75,
    description: 'رف معدني مقاوم للصدأ يثبت بدون مسامير، مثالي لتنظيم الشامبو والصابون بشكل أنيق.',
    images: ['https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=600'],
    sellerId: 'homefy',
    sellerName: 'Homefy Official',
    stock: 200,
    rating: 3.9,
    reviewsCount: 210,
    isBestSeller: true,
  },
  {
    id: '105',
    name: 'مبخرة إلكترونية صغيرة محمولة',
    category: 'إلكترونيات صغيرة',
    price: 320,
    oldPrice: 400,
    description: 'مبخرة عصرية للشعر والملابس تعمل بالشحن USB، سهلة الحمل والاستخدام في أي مكان.',
    images: ['https://images.unsplash.com/photo-1602166669037-93e0b4715a13?auto=format&fit=crop&q=80&w=600'],
    sellerId: 's1',
    sellerName: 'بيت العز',
    stock: 15,
    rating: 4.9,
    reviewsCount: 30,
  }
];

export const MOCK_USER_CUSTOMER: User = {
  id: 'c1',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  role: UserRole.CUSTOMER,
};

export const MOCK_USER_SELLER: User = {
  id: 's1',
  name: 'سارة هوم',
  email: 'seller@example.com',
  role: UserRole.SELLER,
  storeName: 'بيت العز',
  balance: 15000,
};

export const MOCK_USER_ADMIN: User = {
  id: 'a1',
  name: 'مدير المنصة',
  email: 'admin@homefy.com',
  role: UserRole.ADMIN,
};