'use client';

import { useState, useEffect } from 'react';
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
  
  // 移动端显示1条，桌面端显示3条
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const news = newsData.slice(0, isMobile ? 1 : 3); // 移动端1条，桌面端3条

  return (
    <ThemedSection sectionKey="news">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 text-center transition-colors duration-300 ${textColors[theme].primary}`}>
          新闻资讯
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {news.map((article) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="group"
            >
              <div className={`rounded-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105 active:scale-95 h-full flex flex-col border ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
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
                
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                  {/* 标题 */}
                  <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 ${textColors[theme].primary}`}>
                    {article.title}
                  </h3>
                  
                  {/* 标签 */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
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
                  <div className={`flex items-center justify-between text-xs sm:text-sm mt-auto pt-3 sm:pt-4 border-t transition-colors ${textColors[theme].accent} ${
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
                    <span className={`font-medium transition-colors hidden sm:inline ${
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