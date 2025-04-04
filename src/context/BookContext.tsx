
import React, { createContext, useContext, useState } from 'react';
import { books as initialBooks, mockUserProfile as initialUserProfile } from '@/data/books';
import { Book, UserProfile } from '@/types/book';
import { useToast } from '@/hooks/use-toast';

interface BookContextType {
  books: Book[];
  userProfile: UserProfile;
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  addToCart: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  updateReadingProgress: (bookId: string, progress: number) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books] = useState<Book[]>(initialBooks);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const { toast } = useToast();

  const addToWishlist = (bookId: string) => {
    if (!userProfile.wishlist.includes(bookId)) {
      setUserProfile((prev) => ({
        ...prev,
        wishlist: [...prev.wishlist, bookId],
      }));
      toast({
        title: "تمت الإضافة للمفضلة",
        description: "تمت إضافة الكتاب إلى قائمة الرغبات بنجاح.",
      });
    }
  };

  const removeFromWishlist = (bookId: string) => {
    setUserProfile((prev) => ({
      ...prev,
      wishlist: prev.wishlist.filter((id) => id !== bookId),
    }));
    toast({
      title: "تمت الإزالة من المفضلة",
      description: "تمت إزالة الكتاب من قائمة الرغبات بنجاح.",
    });
  };

  const addToCart = (bookId: string) => {
    toast({
      title: "تمت الإضافة للسلة",
      description: "تمت إضافة الكتاب إلى سلة المشتريات بنجاح.",
    });
  };

  const isInWishlist = (bookId: string) => {
    return userProfile.wishlist.includes(bookId);
  };

  const updateReadingProgress = (bookId: string, progress: number) => {
    const existingProgress = userProfile.progress.find((p) => p.bookId === bookId);
    
    if (existingProgress) {
      setUserProfile((prev) => ({
        ...prev,
        progress: prev.progress.map((p) => 
          p.bookId === bookId 
            ? { ...p, progress, lastRead: new Date(), isCompleted: progress >= 1 } 
            : p
        ),
      }));
    } else {
      setUserProfile((prev) => ({
        ...prev,
        progress: [
          ...prev.progress,
          { bookId, progress, lastRead: new Date(), isCompleted: progress >= 1 }
        ],
      }));
    }
    
    if (progress >= 1) {
      toast({
        title: "تهانينا!",
        description: "لقد أكملت قراءة هذا الكتاب.",
      });
    }
  };

  return (
    <BookContext.Provider value={{ 
      books, 
      userProfile, 
      addToWishlist, 
      removeFromWishlist, 
      addToCart,
      isInWishlist,
      updateReadingProgress
    }}>
      {children}
    </BookContext.Provider>
  );
};
