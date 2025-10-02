// Next.js App Router 主布局文件
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '大连理工大学开发区校区足球社',
  description: '大连理工大学开发区校区足球社官方宣传网站',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-cn">
      <body className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300 overflow-x-hidden">
        <AntdRegistry>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
