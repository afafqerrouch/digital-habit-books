
import { HeroSection } from '@/components/Home/HeroSection';
import { FeaturedDeal } from '@/components/Home/FeaturedDeal';
import { BookGrid } from '@/components/Books/BookGrid';
import { CategoriesSection } from '@/components/Home/CategoriesSection';
import { RewardsSection } from '@/components/Home/RewardsSection';
import { ReadingProgressSection } from '@/components/Home/ReadingProgressSection';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { books } from '@/data/books';

const Index = () => {
  // Get featured books
  const featuredBooks = books.filter(book => book.isFeatured).slice(0, 5);
  
  // Get bestseller books
  const bestsellerBooks = books.filter(book => book.isBestseller).slice(0, 5);
  
  // Get new releases
  const newReleases = books.filter(book => book.isNewRelease).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <div className="container mx-auto px-4 pt-8 pb-4">
          <FeaturedDeal />
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <BookGrid 
            books={featuredBooks} 
            title="مختارات مميزة" 
            subtitle="اكتشف مجموعة مختارة من أفضل الكتب المميزة"
          />
        </div>
        
        <ReadingProgressSection />
        
        <div className="container mx-auto px-4 py-8">
          <BookGrid 
            books={bestsellerBooks} 
            title="الأكثر مبيعاً" 
            subtitle="الكتب الأكثر شعبية والأعلى تقييماً"
          />
        </div>
        
        <CategoriesSection />
        
        <div className="container mx-auto px-4 py-8">
          <BookGrid 
            books={newReleases} 
            title="إصدارات جديدة" 
            subtitle="أحدث الكتب المضافة إلى مكتبتنا"
          />
        </div>
        
        <RewardsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
