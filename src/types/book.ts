
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  description: string;
  previewContent?: string;
  published: string;
  isFeatured?: boolean;
  isNewRelease?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
  pages: number;
  language: string;
  format: string[];
}

export interface UserProgress {
  bookId: string;
  progress: number;
  lastRead: Date;
  isCompleted: boolean;
}

export interface UserReward {
  id: string;
  type: 'achievement' | 'discount' | 'free_content';
  title: string;
  description: string;
  dateEarned: Date;
  isRedeemed: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  loyaltyPoints: number;
  purchasedBooks: string[];
  wishlist: string[];
  favorites: string[];
  progress: UserProgress[];
  rewards: UserReward[];
}
