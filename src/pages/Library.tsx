
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, BookOpen, Filter, Search } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { useBooks } from '@/context/BookContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Library = () => {
  const { books, userProfile } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get user's purchased books
  const purchasedBooks = books.filter(book => 
    userProfile.purchasedBooks.includes(book.id)
  );
  
  // Get books with reading progress
  const booksWithProgress = userProfile.progress.map(progress => {
    const book = books.find(b => b.id === progress.bookId);
    return { ...progress, book };
  }).filter(item => item.book);
  
  // Filter reading books (in progress)
  const readingBooks = booksWithProgress
    .filter(item => !item.isCompleted)
    .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime());
  
  // Filter completed books
  const completedBooks = booksWithProgress
    .filter(item => item.isCompleted)
    .sort((a, b) => new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime());
  
  // Filter books based on search
  const filteredBooks = purchasedBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-book-primary">مكتبتي</h1>
          <p className="text-muted-foreground mt-2">جميع الكتب التي اشتريتها والتي تقرأها حالياً</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="ابحث في مكتبتك..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rtl:pl-4 rtl:pr-10"
                />
              </div>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="mr-2 h-4 w-4" />
                <span>تصفية</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="w-full border-b rounded-none">
              <TabsTrigger value="all" className="flex-1">
                كل الكتب
                <Badge className="ml-2 bg-book-primary/10 text-book-primary">{purchasedBooks.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="reading" className="flex-1">
                قيد القراءة
                <Badge className="ml-2 bg-book-secondary/10 text-book-secondary">{readingBooks.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1">
                مكتملة
                <Badge className="ml-2 bg-book-accent/10 text-book-accent">{completedBooks.length}</Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="p-6">
              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <div key={book.id} className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-1/3 flex-shrink-0">
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="font-heading font-medium line-clamp-1 mb-1">{book.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                        
                        <div className="flex items-center mb-3">
                          <Badge className="text-xs">{book.category}</Badge>
                        </div>
                        
                        {userProfile.progress.find(p => p.bookId === book.id) ? (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>التقدم</span>
                              <span>
                                {Math.round(userProfile.progress.find(p => p.bookId === book.id)?.progress! * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={userProfile.progress.find(p => p.bookId === book.id)?.progress! * 100} 
                              className="h-1.5 mb-3"
                            />
                          </div>
                        ) : (
                          <div className="mb-3">
                            <Badge variant="outline" className="text-xs">لم تبدأ بعد</Badge>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Link to={`/reader/${book.id}`} className="flex-1">
                            <Button className="w-full btn-secondary h-8 text-xs">
                              <BookOpen className="h-3 w-3 mr-1" />
                              قراءة
                            </Button>
                          </Link>
                          <Link to={`/book/${book.id}`} className="flex-1">
                            <Button variant="outline" className="w-full h-8 text-xs">
                              التفاصيل
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">لا توجد كتب</h3>
                  <p className="text-muted-foreground mb-6">لم يتم العثور على أي كتب في مكتبتك.</p>
                  <Link to="/">
                    <Button className="btn-primary">تصفح المكتبة</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reading" className="p-6">
              {readingBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {readingBooks.map((item) => (
                    item.book && (
                      <div key={item.bookId} className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-1/3 flex-shrink-0">
                          <img 
                            src={item.book.coverImage} 
                            alt={item.book.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <h3 className="font-heading font-medium line-clamp-1 mb-1">{item.book.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.book.author}</p>
                          
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>التقدم</span>
                              <span>{Math.round(item.progress * 100)}%</span>
                            </div>
                            <Progress value={item.progress * 100} className="h-1.5 mb-1" />
                            <p className="text-xs text-muted-foreground">
                              آخر قراءة: {new Date(item.lastRead).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Link to={`/reader/${item.bookId}`} className="flex-1">
                              <Button className="w-full btn-secondary h-8 text-xs">
                                <BookOpen className="h-3 w-3 mr-1" />
                                متابعة القراءة
                              </Button>
                            </Link>
                            <Link to={`/book/${item.bookId}`} className="flex-1">
                              <Button variant="outline" className="w-full h-8 text-xs">
                                التفاصيل
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">لا توجد كتب قيد القراءة</h3>
                  <p className="text-muted-foreground mb-6">ابدأ بقراءة كتاب من مكتبتك.</p>
                  <Link to="/">
                    <Button className="btn-primary">تصفح المكتبة</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="p-6">
              {completedBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedBooks.map((item) => (
                    item.book && (
                      <div key={item.bookId} className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-1/3 flex-shrink-0">
                          <img 
                            src={item.book.coverImage} 
                            alt={item.book.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <h3 className="font-heading font-medium line-clamp-1 mb-1">{item.book.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.book.author}</p>
                          
                          <div className="mb-3">
                            <Badge className="bg-green-500 text-white">مكتمل</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              تاريخ الإكمال: {new Date(item.lastRead).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Link to={`/reader/${item.bookId}`} className="flex-1">
                              <Button className="w-full btn-secondary h-8 text-xs">
                                <BookOpen className="h-3 w-3 mr-1" />
                                قراءة مجدداً
                              </Button>
                            </Link>
                            <Link to={`/book/${item.bookId}`} className="flex-1">
                              <Button variant="outline" className="w-full h-8 text-xs">
                                التفاصيل
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">لا توجد كتب مكتملة</h3>
                  <p className="text-muted-foreground mb-6">أكمل قراءة كتاب لرؤيته هنا.</p>
                  <Link to="/">
                    <Button className="btn-primary">تصفح المكتبة</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Library;
