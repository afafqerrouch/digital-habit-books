
import { Book } from '../types/book';

export const books: Book[] = [
  {
    id: '1',
    title: 'عادات العقل',
    author: 'جيمس آندرسون',
    coverImage: '/placeholder.svg',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    category: 'تطوير الذات',
    description: 'كتاب يركز على كيفية بناء عادات إيجابية وتطوير التفكير الفعال',
    previewContent: 'الفصل الأول: أساسيات تكوين العادات...',
    published: '2023-02-15',
    isFeatured: true,
    isOnSale: true,
    pages: 320,
    language: 'العربية',
    format: ['PDF', 'ePub']
  },
  {
    id: '2',
    title: 'قوة العادات',
    author: 'تشارلز دويج',
    coverImage: '/placeholder.svg',
    price: 59.99,
    rating: 4.7,
    category: 'علم النفس',
    description: 'يشرح هذا الكتاب كيفية تغيير عاداتنا اليومية وتأثيرها على حياتنا',
    published: '2022-08-20',
    isBestseller: true,
    pages: 380,
    language: 'العربية',
    format: ['PDF', 'ePub', 'MOBI']
  },
  {
    id: '3',
    title: 'العقل المرن',
    author: 'كارول دويك',
    coverImage: '/placeholder.svg',
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.5,
    category: 'تطوير الذات',
    description: 'يستكشف الكتاب مفهوم العقلية ودورها في تحقيق النجاح والإنجاز',
    published: '2022-05-10',
    isNewRelease: true,
    isOnSale: true,
    pages: 280,
    language: 'العربية',
    format: ['PDF', 'ePub']
  },
  {
    id: '4',
    title: 'فن التأثير',
    author: 'روبرت سيالديني',
    coverImage: '/placeholder.svg',
    price: 44.99,
    rating: 4.6,
    category: 'أعمال',
    description: 'يكشف عن الأسرار النفسية للإقناع والتأثير على الآخرين',
    published: '2023-01-18',
    isBestseller: true,
    pages: 290,
    language: 'العربية',
    format: ['PDF', 'ePub']
  },
  {
    id: '5',
    title: 'القراءة السريعة',
    author: 'سامي المصري',
    coverImage: '/placeholder.svg',
    price: 34.99,
    rating: 4.3,
    category: 'مهارات',
    description: 'تقنيات عملية لزيادة سرعة القراءة وتحسين الفهم والاستيعاب',
    published: '2022-11-05',
    pages: 215,
    language: 'العربية',
    format: ['PDF']
  },
  {
    id: '6',
    title: 'التفكير الإبداعي',
    author: 'إبراهيم الفقي',
    coverImage: '/placeholder.svg',
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.9,
    category: 'تطوير الذات',
    description: 'كيفية تنمية مهارات التفكير الإبداعي وحل المشكلات',
    published: '2023-03-22',
    isFeatured: true,
    isOnSale: true,
    pages: 340,
    language: 'العربية',
    format: ['PDF', 'ePub', 'MOBI']
  },
];

export const categories = [
  { id: '1', name: 'تطوير الذات', count: 24 },
  { id: '2', name: 'علم النفس', count: 18 },
  { id: '3', name: 'أعمال', count: 15 },
  { id: '4', name: 'مهارات', count: 12 },
  { id: '5', name: 'تاريخ', count: 9 },
  { id: '6', name: 'علوم', count: 14 },
  { id: '7', name: 'فلسفة', count: 11 },
  { id: '8', name: 'أدب', count: 20 },
];

export const featuredDeal = {
  id: '1',
  title: 'عرض اليوم الرقمي',
  book: books.find(book => book.id === '1'),
  discount: 30,
  endsIn: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
};

export const mockUserProfile = {
  id: 'user1',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  avatar: '/placeholder.svg',
  loyaltyPoints: 250,
  purchasedBooks: ['1', '3', '5'],
  wishlist: ['2', '4'],
  favorites: ['1', '6'],
  progress: [
    { bookId: '1', progress: 0.65, lastRead: new Date(), isCompleted: false },
    { bookId: '3', progress: 0.12, lastRead: new Date(), isCompleted: false },
    { bookId: '5', progress: 1, lastRead: new Date(), isCompleted: true },
  ],
  rewards: [
    {
      id: 'r1',
      type: 'achievement',
      title: 'قارئ مثابر',
      description: 'أكملت قراءة 3 كتب هذا الشهر',
      dateEarned: new Date(),
      isRedeemed: false
    },
    {
      id: 'r2',
      type: 'discount',
      title: 'خصم 15%',
      description: 'خصم على الكتاب القادم',
      dateEarned: new Date(),
      isRedeemed: false
    }
  ]
};
