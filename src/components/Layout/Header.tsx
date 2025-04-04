
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, BookOpen, Heart, Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { mockUserProfile } from '@/data/books';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium hover:text-book-secondary transition-colors">الرئيسية</Link>
                <Link to="/categories" className="text-lg font-medium hover:text-book-secondary transition-colors">التصنيفات</Link>
                <Link to="/new-releases" className="text-lg font-medium hover:text-book-secondary transition-colors">إصدارات جديدة</Link>
                <Link to="/offers" className="text-lg font-medium hover:text-book-secondary transition-colors">العروض</Link>
                <Link to="/library" className="text-lg font-medium hover:text-book-secondary transition-colors">مكتبتي</Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <BookOpen className="h-6 w-6 text-book-primary" />
            <span className="text-xl font-heading font-bold text-book-primary">كتابي الرقمي</span>
          </Link>
          
          <nav className="hidden md:flex mx-6 space-x-4 rtl:space-x-reverse">
            <Link to="/" className="text-sm font-medium hover:text-book-secondary transition-colors">الرئيسية</Link>
            <Link to="/categories" className="text-sm font-medium hover:text-book-secondary transition-colors">التصنيفات</Link>
            <Link to="/new-releases" className="text-sm font-medium hover:text-book-secondary transition-colors">إصدارات جديدة</Link>
            <Link to="/offers" className="text-sm font-medium hover:text-book-secondary transition-colors">العروض</Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {searchOpen ? (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/95 p-4">
              <div className="w-full max-w-md flex">
                <Input 
                  className="flex-1" 
                  placeholder="ابحث عن كتاب، مؤلف، أو تصنيف..." 
                  autoFocus 
                />
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-book-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {mockUserProfile.wishlist.length}
              </span>
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-book-secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-book-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </Button>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
