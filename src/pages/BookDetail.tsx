
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Book, BookOpen, CheckCircle, Clock, Download, 
  Heart, Share2, ShoppingCart, Star, User 
} from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBooks } from '@/context/BookContext';
import { BookGrid } from '@/components/Books/BookGrid';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { books, addToWishlist, addToCart, isInWishlist } = useBooks();
  const [previewActive, setPreviewActive] = useState(false);
  
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-heading font-medium mb-4">لم يتم العثور على الكتاب</h1>
          <p className="text-muted-foreground mb-6">عذراً، لم نتمكن من العثور على الكتاب المطلوب.</p>
          <Link to="/">
            <Button>العودة للصفحة الرئيسية</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get similar books (same category)
  const similarBooks = books
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:w-1/3 p-6 flex justify-center">
              <div className="relative max-w-[280px]">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                {book.isOnSale && (
                  <Badge className="absolute top-2 right-2 bg-book-accent">خصم</Badge>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div>
                  <div className="flex items-center mb-2">
                    <Badge className="bg-book-primary/10 text-book-primary mr-2">{book.category}</Badge>
                    {book.isNewRelease && (
                      <Badge className="bg-book-secondary/10 text-book-secondary mr-2">جديد</Badge>
                    )}
                    {book.isBestseller && (
                      <Badge className="bg-amber-500/10 text-amber-600">الأكثر مبيعاً</Badge>
                    )}
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-heading font-semibold mb-2">{book.title}</h1>
                  <p className="text-muted-foreground mb-4">تأليف: {book.author}</p>
                  
                  <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-5 w-5 fill-current mr-1" />
                      <span>{book.rating}</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Book className="h-5 w-5 mr-1" />
                      <span>{book.pages} صفحة</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-5 w-5 mr-1" />
                      <span>{Math.ceil(book.pages / 30)} ساعة للقراءة</span>
                    </div>
                  </div>
                  
                  <p className="mb-6">
                    {book.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">التاريخ</p>
                      <p className="font-medium">{book.published}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">اللغة</p>
                      <p className="font-medium">{book.language}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">الصيغة</p>
                      <p className="font-medium">{book.format.join(', ')}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">الصفحات</p>
                      <p className="font-medium">{book.pages}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl font-bold text-book-primary mr-2">{book.price} ر.س</span>
                    {book.originalPrice && (
                      <span className="text-muted-foreground line-through">{book.originalPrice} ر.س</span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      className="btn-primary flex-1 sm:flex-none" 
                      onClick={() => addToCart(book.id)}
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" />
                      <span>إضافة للسلة</span>
                    </Button>
                    
                    <Button 
                      variant={isInWishlist(book.id) ? "default" : "outline"} 
                      className={isInWishlist(book.id) ? "bg-book-accent" : ""}
                      onClick={() => addToWishlist(book.id)}
                    >
                      <Heart className="mr-1 h-4 w-4" />
                      <span>المفضلة</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setPreviewActive(true)}
                    >
                      <BookOpen className="mr-1 h-4 w-4" />
                      <span>معاينة</span>
                    </Button>
                    
                    <Button variant="outline">
                      <Share2 className="mr-1 h-4 w-4" />
                      <span>مشاركة</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-green-700">متوفر للتحميل الفوري بعد الشراء</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Tabs defaultValue="description">
              <TabsList className="w-full border-b">
                <TabsTrigger value="description" className="flex-1">الوصف</TabsTrigger>
                <TabsTrigger value="preview" className="flex-1">معاينة</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">التقييمات</TabsTrigger>
                <TabsTrigger value="author" className="flex-1">المؤلف</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="py-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-heading font-medium mb-4">عن الكتاب</h2>
                  <p className="mb-4">{book.description}</p>
                  <p>
                    يعتبر هذا الكتاب من الكتب الأساسية في مجاله، حيث يقدم محتوى غنياً ومفيداً للقراء المهتمين بتطوير
                    مهاراتهم وبناء عادات إيجابية. يتميز الكتاب بأسلوبه السلس وأمثلته العملية التي تساعد القارئ
                    على تطبيق المفاهيم في حياته اليومية.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="py-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-heading font-medium">معاينة الكتاب</h2>
                    <Button variant="outline" className="text-book-primary">
                      <Download className="mr-1 h-4 w-4" />
                      <span>تحميل النموذج</span>
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px]">
                    {book.previewContent ? (
                      <p className="whitespace-pre-line">{book.previewContent}</p>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p>المعاينة غير متوفرة حالياً.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-heading font-medium">تقييمات القراء</h2>
                    <Button className="btn-secondary">إضافة تقييم</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-book-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-book-primary" />
                          </div>
                          <div className="ml-3 rtl:ml-0 rtl:mr-3">
                            <h4 className="font-medium">أحمد محمد</h4>
                            <p className="text-sm text-muted-foreground">20 مارس 2025</p>
                          </div>
                        </div>
                        <div className="flex items-center text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                      <p className="mt-3">
                        كتاب رائع جداً، استفدت منه كثيراً في بناء عادات جديدة. أسلوب الكاتب سلس وواضح،
                        والأمثلة العملية ساعدتني على تطبيق الأفكار بسهولة.
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-book-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-book-primary" />
                          </div>
                          <div className="ml-3 rtl:ml-0 rtl:mr-3">
                            <h4 className="font-medium">سارة خالد</h4>
                            <p className="text-sm text-muted-foreground">15 فبراير 2025</p>
                          </div>
                        </div>
                        <div className="flex items-center text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4 fill-current" />
                          <Star className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="mt-3">
                        قرأت الكتاب خلال أسبوع واحد. المعلومات مفيدة جداً والتمارين العملية ساعدتني كثيراً.
                        أنصح به لكل من يريد تحسين حياته وبناء عادات إيجابية.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="author" className="py-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-heading font-medium mb-4">عن المؤلف</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-book-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-book-primary" />
                    </div>
                    <div className="ml-4 rtl:ml-0 rtl:mr-4">
                      <h3 className="font-heading font-medium">{book.author}</h3>
                      <p className="text-sm text-muted-foreground">كاتب ومتخصص في تطوير الذات</p>
                    </div>
                  </div>
                  <p>
                    مؤلف محترف متخصص في مجال تطوير الذات وبناء العادات الإيجابية. له العديد من الكتب المنشورة
                    التي حققت نجاحاً كبيراً وترجمت إلى عدة لغات. يتميز أسلوبه بالسلاسة والوضوح والتركيز
                    على الجوانب العملية التطبيقية.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {similarBooks.length > 0 && (
            <div className="mt-12">
              <BookGrid 
                books={similarBooks} 
                title="كتب مشابهة" 
                subtitle="قد تعجبك هذه الكتب المشابهة"
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {previewActive && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setPreviewActive(false)}>
          <div className="bg-white max-w-2xl w-full max-h-[80vh] overflow-auto rounded-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h3 className="font-heading font-medium">{book.title} - معاينة</h3>
              <Button variant="ghost" size="icon" onClick={() => setPreviewActive(false)}>
                <Book className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              {book.previewContent ? (
                <p className="whitespace-pre-line">{book.previewContent}</p>
              ) : (
                <p className="text-center py-12 text-muted-foreground">المعاينة غير متوفرة حالياً.</p>
              )}
            </div>
            <div className="border-t p-4 text-center sticky bottom-0 bg-white">
              <Button className="btn-primary" onClick={() => addToCart(book.id)}>
                <ShoppingCart className="mr-1 h-4 w-4" />
                <span>شراء الكتاب الكامل</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
