
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { featuredDeal } from '@/data/books';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ShoppingCart } from 'lucide-react';

export function FeaturedDeal() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = featuredDeal.endsIn.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  if (!featuredDeal.book) return null;

  return (
    <section className="py-8 bg-gradient-to-r from-book-primary/10 to-book-secondary/10 rounded-xl overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 relative">
            <div className="absolute -top-2 -right-2 z-10">
              <Badge className="bg-book-accent text-white text-base px-3 py-1">
                خصم {featuredDeal.discount}%
              </Badge>
            </div>
            <img 
              src={featuredDeal.book.coverImage} 
              alt={featuredDeal.book.title} 
              className="rounded-lg shadow-lg w-full max-w-[200px] mx-auto animate-float"
            />
          </div>
          
          <div className="md:w-2/3 text-center md:text-right">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-book-primary">
              {featuredDeal.title}
            </h2>
            
            <h3 className="text-xl md:text-2xl font-heading mt-2 mb-3">
              {featuredDeal.book.title}
            </h3>
            
            <p className="text-muted-foreground mb-3">
              تأليف: {featuredDeal.book.author} | {featuredDeal.book.pages} صفحة
            </p>
            
            <p className="mb-6 line-clamp-2 md:line-clamp-3">
              {featuredDeal.book.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Clock className="h-5 w-5 text-book-primary" />
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <div className="bg-book-primary text-white px-2 py-1 rounded">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span>:</span>
                  <div className="bg-book-primary text-white px-2 py-1 rounded">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span>:</span>
                  <div className="bg-book-primary text-white px-2 py-1 rounded">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
              
              <div>
                <span className="font-bold text-book-primary text-xl">
                  {featuredDeal.book.price} ر.س
                </span>
                {featuredDeal.book.originalPrice && (
                  <span className="mx-2 text-muted-foreground line-through">
                    {featuredDeal.book.originalPrice} ر.س
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button className="btn-primary">
                <ShoppingCart className="mr-1 h-4 w-4" />
                <span>إضافة للسلة</span>
              </Button>
              
              <Link to={`/book/${featuredDeal.book.id}`}>
                <Button variant="outline">عرض التفاصيل</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
