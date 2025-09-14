import { getAllNews } from '@/lib/news';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function NewsListPage() {
  const allNews = getAllNews();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      {/* 主要内容区域 */}
      <main className="pt-[8vh] pb-8">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* 页面标题 */}
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              新闻资讯
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              大连理工大学开发区校区足球社最新动态，精彩赛事回顾，活动资讯一览
            </p>
          </header>

          {/* 新闻网格 */}
          {allNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allNews.map((article) => (
                <Link
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col">
                    {/* 封面图片 - 手机横屏比例 16:9 */}
                    {article.coverImage && (
                      <div className="w-full" style={{ aspectRatio: '16/9' }}>
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          width={400}
                          height={225}
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col flex-1">
                      {/* 标题 */}
                      <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      
                      {/* 标签 */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* 底部信息 */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1">
                            📅 {article.publishDate}
                          </span>
                          {article.author && (
                            <span className="flex items-center gap-1">
                              ✍️ {article.author}
                            </span>
                          )}
                        </div>
                        <span className="text-blue-600 font-medium group-hover:text-blue-700">
                          阅读更多 →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">暂无新闻</h3>
              <p className="text-gray-500 mb-8">
                目前还没有发布任何新闻，请稍后再来查看
              </p>
              <Link
                href="/#news"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← 返回主页
              </Link>
            </div>
          )}

          {/* 返回主页按钮 */}
          {allNews.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/#news"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← 返回主页
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
