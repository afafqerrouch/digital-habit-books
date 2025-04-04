
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { CategoryList } from '@/components/Categories/CategoryList';

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-book-primary">تصنيفات الكتب</h1>
          <p className="text-muted-foreground mt-2">تصفح الكتب حسب التصنيف واكتشف مجموعتنا المتنوعة</p>
        </div>
        
        <CategoryList />
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
