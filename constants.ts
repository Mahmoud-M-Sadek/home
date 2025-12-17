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
    description: 'طقم علب تنظيم شفاف عالي الجودة للحفاظ على الخضروات والفاكهة طازجة.',
    images: ['https://picsum.photos/seed/kitchen1/400/400', 'https://picsum.photos/seed/kitchen1-2/400/400'],
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
    description: 'ممسحة مسطحة ميكروفايبر تدور ٣٦٠ درجة مع دلو للعصر الذاتي.',
    images: ['https://picsum.photos/seed/clean1/400/400'],
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
    description: 'قطاعة آمنة وسريعة لتقطيع الخضروات والفواكه بأشكال مختلفة.',
    images: ['https://picsum.photos/seed/chop1/400/400'],
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
    description: 'رف معدني مقاوم للصدأ يثبت بدون مسامير.',
    images: ['https://picsum.photos/seed/bath1/400/400'],
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
    description: 'مبخرة للشعر والملابس تعمل بالشحن USB.',
    images: ['https://picsum.photos/seed/incense/400/400'],
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
