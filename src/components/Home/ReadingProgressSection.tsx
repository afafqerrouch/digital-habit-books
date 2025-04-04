
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { mockUserProfile, books } from '@/data/books';

export function ReadingProgressSection() {
  // Get user progress and match with books
  const readingProgress = mockUserProfile.progress
    .map(progress => ({
      ...progress,
      book: books.find(book => book.id === progress.bookId)
    }))
    .filter(item => item.book && !item.isCompleted)
    .slice(0, 3);

  if (readingProgress.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-r from-book-accent/5 to-book-secondary/5">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-book-primary">استكمل القراءة</h2>
          <p className="text-muted-foreground mt-2">واصل القراءة من حيث توقفت لإكمال كتبك الحالية</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {readingProgress.map((item) => (
            item.book && (
              <div key={item.bookId} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="flex p-4">
                  <div className="w-20 flex-shrink-0">
                    <img 
                      src={item.book.coverImage} 
                      alt={item.book.title} 
                      className="w-full h-auto rounded"
                    />
                  </div>
                  
                  <div className="flex-grow ml-4 rtl:ml-0 rtl:mr-4">
                    <h3 className="font-heading font-medium line-clamp-1">{item.book.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.book.author}</p>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>تقدم القراءة</span>
                        <span>{Math.round(item.progress * 100)}%</span>
                      </div>
                      <Progress value={item.progress * 100} className="h-2" />
                      
                      <div className="mt-4">
                        <Link to={`/reader/${item.bookId}`}>
                          <Button className="w-full btn-secondary">
                            <Book className="mr-1 h-4 w-4" />
                            <span>متابعة القراءة</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/library">
            <Button variant="outline">عرض مكتبتي الكاملة</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
