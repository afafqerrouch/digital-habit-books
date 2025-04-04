
import { Link } from 'react-router-dom';
import { Badge, BookOpen, Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUserProfile } from '@/data/books';

export function RewardsSection() {
  return (
    <section className="py-12 bg-book-light">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-book-primary">برنامج المكافآت والولاء</h2>
          <p className="text-muted-foreground mt-2">اكتسب النقاط واحصل على مكافآت حصرية كلما قرأت واشتريت المزيد</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-book-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-book-primary" />
            </div>
            <h3 className="text-xl font-heading font-medium mb-2">عادات القراءة اليومية</h3>
            <p className="text-muted-foreground mb-4">
              احصل على نقاط إضافية عند القراءة يومياً والالتزام بجدول القراءة.
            </p>
            <div className="mt-4">
              <Link to="/challenges">
                <Button variant="outline">تحديات القراءة</Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-book-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-book-secondary" />
            </div>
            <h3 className="text-xl font-heading font-medium mb-2">نظام النقاط والمستويات</h3>
            <p className="text-muted-foreground mb-4">
              اجمع النقاط وارتقِ في المستويات للحصول على مكافآت أكبر ومحتوى حصري.
            </p>
            <div className="mt-4">
              <div className="bg-gray-100 h-4 rounded-full">
                <div 
                  className="bg-gradient-to-r from-book-primary to-book-secondary h-full rounded-full"
                  style={{ width: `${(mockUserProfile.loyaltyPoints / 500) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm mt-2">
                <span className="font-medium">{mockUserProfile.loyaltyPoints} نقطة</span> من أصل 500 للمستوى التالي
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-book-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-book-accent" />
            </div>
            <h3 className="text-xl font-heading font-medium mb-2">مكافآت حصرية</h3>
            <p className="text-muted-foreground mb-4">
              احصل على كتب مجانية، خصومات، ومحتوى حصري عند تحقيق الإنجازات.
            </p>
            <div className="mt-4">
              {mockUserProfile.rewards.length > 0 && (
                <div className="flex flex-col gap-2">
                  {mockUserProfile.rewards.map((reward) => (
                    <div key={reward.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{reward.title}</span>
                      <Link to="/rewards">
                        <Button variant="ghost" className="h-8 text-book-accent">استخدام</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/loyalty-program">
            <Button className="btn-primary">اكتشف برنامج الولاء الكامل</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
