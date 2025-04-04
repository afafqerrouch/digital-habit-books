
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, books } from '@/data/books';
import { BookGrid } from '@/components/Books/BookGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CategoriesSection() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  
  const filteredBooks = books.filter(book => 
    book.category === categories.find(c => c.id === activeCategory)?.name
  ).slice(0, 5);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-book-primary">تصفح حسب التصنيف</h2>
          <p className="text-muted-foreground mt-2">اختر من بين مجموعة متنوعة من التصنيفات لتجد الكتب التي تناسب اهتماماتك</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={activeCategory === category.id ? "bg-book-primary" : ""}
            >
              {category.name}
              <span className="mr-1 text-xs opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>
        
        {filteredBooks.length > 0 ? (
          <>
            <BookGrid books={filteredBooks} />
            
            <div className="mt-8 text-center">
              <Link to="/categories">
                <Button variant="outline" className="group">
                  <span>عرض المزيد</span>
                  <ArrowRight className="mr-2 h-4 w-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا توجد كتب في هذا التصنيف حالياً.</p>
          </div>
        )}
      </div>
    </section>
  );
}
