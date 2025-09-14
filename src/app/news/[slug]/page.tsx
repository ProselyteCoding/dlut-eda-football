import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getNewsBySlug, getNewsSlugList } from '@/lib/news';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getNewsSlugList();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      {/* 主要内容区域 - 正常滚动 */}
      <main className="pt-[8vh] pb-8">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* 文章头部信息 */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{article.title}</h1>
            
            {/* 封面图片 */}
            {article.coverImage && (
              <div className="w-full mb-6 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full object-cover"
                  style={{ aspectRatio: '16/9' }}
                  width={800}
                  height={450}
                />
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              {article.publishDate && (
                <span className="flex items-center gap-1">
                  📅 {article.publishDate}
                </span>
              )}
              {article.author && (
                <span className="flex items-center gap-1">
                  ✍️ {article.author}
                </span>
              )}
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* 文章内容 */}
          <article className="bg-white rounded-xl shadow-lg p-8 prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-6">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="ml-4">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-800">
                    {children}
                  </strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                    {children}
                  </blockquote>
                ),
                hr: () => (
                  <hr className="border-gray-300 my-8" />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </article>

          {/* 返回按钮 */}
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← 返回新闻页面
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
