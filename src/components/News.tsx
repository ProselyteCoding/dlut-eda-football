import Link from 'next/link';
import { getAllNews } from '@/lib/news';

interface NewsArticle {
  slug: string;
  title: string;
  publishDate?: string;
  author?: string;
  tags?: string[];
  coverImage?: string; // 新增封面图片字段
}

// 新闻 - 服务器组件
export default function News() {
  // 直接在服务器端获取新闻数据
  const allNews = getAllNews();
  const news = allNews.slice(0, 3); // 只显示最新的3条新闻

  return (
    <section className="h-screen w-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
          新闻资讯
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col">
                {/* 封面图片 - 手机横屏比例 16:9 */}
                {article.coverImage && (
                  <div className="w-full" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  {/* 标题 */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
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
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-4">
            💡 只显示最新的3条新闻，点击查看详细内容
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看更多新闻 →
          </Link>
        </div>
      </div>
    </section>
  );
}