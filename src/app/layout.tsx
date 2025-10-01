// Next.js App Router 主布局文件
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-cn">
      <body className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <AntdRegistry>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
