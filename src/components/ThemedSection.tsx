'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { themeColors, decorativeElements } from '@/utils/theme';

interface ThemedSectionProps {
  children: React.ReactNode;
  sectionKey: keyof typeof themeColors.light;
  className?: string;
}

export default function ThemedSection({ children, sectionKey, className = '' }: ThemedSectionProps) {
  const { theme } = useTheme();
  
  const bgClass = `bg-gradient-to-br ${themeColors[theme][sectionKey]}`;
  
  return (
    <section className={`h-screen w-full ${bgClass} flex items-center justify-center transition-all duration-500 relative overflow-hidden ${className}`}>
      {/* 装饰性背景元素 */}
      {theme === 'dark' && (
        <>
          {/* 光效装饰 */}
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-15 blur-2xl bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse delay-1000"></div>
          
          {/* 几何装饰 */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping delay-500"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-40 animate-ping delay-700"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-50 animate-ping delay-300"></div>
        </>
      )}
      
      {/* 内容区域 */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}