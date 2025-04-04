
import { Book } from '@/types/book';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  title?: string;
  subtitle?: string;
}

export function BookGrid({ books, title, subtitle }: BookGridProps) {
  return (
    <section className="py-8">
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {title && <h2 className="text-2xl md:text-3xl font-heading font-semibold text-book-primary">{title}</h2>}
          {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
