
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-book-primary to-book-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-right mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight">
              كتب رقمية تغير عاداتك وحياتك للأفضل
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6 max-w-xl mx-auto md:mx-0">
              احصل على أفضل الكتب الرقمية التي تساعدك على بناء عادات إيجابية وتطوير ذاتك بطريقة مستدامة.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/categories">
                <Button className="bg-white text-book-primary hover:bg-white/90">
                  <span>تصفح الكتب</span>
                  <ArrowRight className="mr-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
              <Link to="/offers">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  عروض اليوم
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex justify-center md:justify-start space-x-8 rtl:space-x-reverse">
              <div className="text-center">
                <p className="text-3xl font-bold">+1000</p>
                <p className="text-sm opacity-80">كتاب رقمي</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">+100</p>
                <p className="text-sm opacity-80">مؤلف</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">+10K</p>
                <p className="text-sm opacity-80">قارئ سعيد</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end relative">
            <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px]">
              <div className="absolute top-0 right-0 w-[200px] h-[280px] bg-white/10 backdrop-blur-sm rounded-lg transform rotate-6 animate-pulse-light"></div>
              <div className="absolute top-8 -right-4 w-[200px] h-[280px] bg-white/10 backdrop-blur-sm rounded-lg transform -rotate-3 animate-pulse-light" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-4 right-4 w-[200px] h-[280px] bg-white p-2 rounded-lg shadow-xl">
                <div className="bg-book-accent h-full w-full rounded flex items-center justify-center">
                  <BookOpen className="h-20 w-20 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
