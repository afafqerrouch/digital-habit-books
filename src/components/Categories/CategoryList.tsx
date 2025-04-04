
import { Link } from 'react-router-dom';
import { categories } from '@/data/books';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

export function CategoryList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          to={`/categories/${category.id}`}
          className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex justify-between items-center"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-book-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-book-primary" />
            </div>
            <div className="ml-4 rtl:ml-0 rtl:mr-4">
              <h3 className="font-heading font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} كتاب</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-book-primary">
            <ArrowRight className="h-5 w-5 rtl:rotate-180" />
          </Button>
        </Link>
      ))}
    </div>
  );
}
