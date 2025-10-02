'use client';

import Link from 'next/link';
import ThemedSection from './ThemedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';

interface NewsArticle {
  slug: string;
  title: string;
  publishDate?: string;
  author?: string;
  tags?: string[];
  coverImage?: string;
}

// 新闻 - 客户端组件（接收服务器端数据作为props）
interface NewsProps {
  newsData: NewsArticle[];
}

export default function News({ newsData }: NewsProps) {
  const { theme } = useTheme();
  const news = newsData.slice(0, 3); // 只显示最新的3条新闻

  return (
    <ThemedSection sectionKey="news">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className={`text-5xl font-bold mb-8 text-center transition-colors duration-300 ${textColors[theme].primary}`}>
          新闻资讯
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group"
            >
              <div className={`rounded-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105 h-full flex flex-col border ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
                {/* 封面图片 - 手机横屏比例 16:9 */}
                {article.coverImage && (
                  <div className="w-full" style={{ aspectRatio: '16/9' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-1">
                  {/* 标题 */}
                  <h3 className={`text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 ${textColors[theme].primary}`}>
                    {article.title}
                  </h3>
                  
                  {/* 标签 */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            theme === 'dark' 
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* 底部信息 */}
                  <div className={`flex items-center justify-between text-sm mt-auto pt-4 border-t transition-colors ${textColors[theme].accent} ${
                    theme === 'dark' ? 'border-slate-600' : 'border-gray-100'
                  }`}>
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
                    <span className={`font-medium transition-colors ${
                      theme === 'dark' ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'
                    }`}>
                      阅读更多
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看更多新闻
          </Link>
        </div>
      </div>
    </ThemedSection>
  );
}