
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <BookOpen className="h-6 w-6 text-book-primary" />
              <span className="text-xl font-heading font-bold text-book-primary">كتابي الرقمي</span>
            </Link>
            <p className="text-gray-600 mb-4">
              منصتك الأولى للكتب الرقمية العربية، نقدم أفضل المحتوى الرقمي لتطوير مهاراتك وزيادة معرفتك.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5 text-gray-600 hover:text-book-primary" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5 text-gray-600 hover:text-book-primary" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5 text-gray-600 hover:text-book-primary" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-book-primary transition-colors">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-book-primary transition-colors">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-book-primary transition-colors">الأسئلة الشائعة</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-book-primary transition-colors">الشروط والأحكام</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-book-primary transition-colors">سياسة الخصوصية</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-lg mb-4">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-book-primary flex-shrink-0" />
                <span className="text-gray-600">الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-book-primary flex-shrink-0" />
                <span className="text-gray-600">+966 12 345 6789</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-book-primary flex-shrink-0" />
                <span className="text-gray-600">info@digitalbooks.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-medium text-lg mb-4">النشرة البريدية</h3>
            <p className="text-gray-600 mb-4">
              اشترك في نشرتنا البريدية للحصول على أحدث العروض والإصدارات.
            </p>
            <div className="flex flex-col space-y-2">
              <Input placeholder="بريدك الإلكتروني" type="email" />
              <Button className="w-full btn-primary">اشترك الآن</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 text-center text-gray-600">
          <p>&copy; 2025 كتابي الرقمي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
