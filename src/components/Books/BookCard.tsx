
import { Link } from 'react-router-dom';
import { Book } from '@/types/book';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface BookCardProps {
  book: Book;
  showActions?: boolean;
}

export function BookCard({ book, showActions = true }: BookCardProps) {
  return (
    <div className="book-card group h-full flex flex-col bg-white">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {book.isNewRelease && (
            <Badge className="bg-book-secondary">جديد</Badge>
          )}
          {book.isBestseller && (
            <Badge className="bg-book-primary">الأكثر مبيعاً</Badge>
          )}
          {book.isOnSale && (
            <Badge className="bg-book-accent">خصم</Badge>
          )}
        </div>
        
        {showActions && (
          <div className="book-card-overlay">
            <div className="flex flex-col gap-2">
              <Link to={`/book/${book.id}`}>
                <Button className="w-full bg-white text-book-primary hover:bg-white/90">
                  عرض التفاصيل
                </Button>
              </Link>
              <Button className="w-full btn-primary">
                <ShoppingCart className="mr-1 h-4 w-4" />
                <span>إضافة للسلة</span>
              </Button>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 text-book-primary hover:bg-white">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-3">
        <Link to={`/book/${book.id}`} className="block mt-1">
          <h3 className="font-heading text-lg font-medium line-clamp-1 hover:text-book-primary transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        
        <div className="flex items-center mt-2 text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="mx-1">{book.rating}</span>
        </div>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div>
            <span className="font-medium text-book-primary">{book.price} ر.س</span>
            {book.originalPrice && (
              <span className="mx-2 text-sm text-muted-foreground line-through">
                {book.originalPrice} ر.س
              </span>
            )}
          </div>
          
          {book.format.length > 0 && (
            <div className="flex space-x-1 rtl:space-x-reverse">
              {book.format.map((format) => (
                <Badge key={format} variant="outline" className="text-xs">
                  {format}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
