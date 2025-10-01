'use client';
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const sections = useMemo(() => [
    { name: '新闻', id: 'news' },
    { name: '活动', id: 'activities' },
    { name: '橙锋杯', id: 'school-cup' },
    { name: '大工杯', id: 'dut-cup' },
    { name: '打卡', id: 'check-in' },
    { name: '球星卡DIY', id: 'card-diy' },
    { name: '联系方式', id: 'contact' }
  ], []);

  const [activeSection, setActiveSection] = useState('news');
  const [isVisible, setIsVisible] = useState(false); // 控制 Navbar 显示/隐藏
  const [lastScrollY, setLastScrollY] = useState(0);

  // 监听滚动位置，控制 Navbar 显示/隐藏
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 滚动超过 50px 才显示 Navbar
      if (currentScrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始化检查
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // 监听滚动，更新当前激活的section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 找到最大可见面积的section
        let maxRatio = 0;
        let activeId = '';
        
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeId = entry.target.id;
          }
        });
        
        if (activeId && maxRatio > 0.3) {
          setActiveSection(activeId);
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  // 点击导航项滚动到对应section
  const scrollToSection = (sectionId: string) => {
    // 检查当前页面是否为主页
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      // 在主页，直接滚动到对应section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // 不在主页，跳转到主页并定位到对应section
      window.location.href = `/#${sectionId}`;
    }
  };
  
  
  return (
    <div className={`fixed left-0 w-full z-50 transition-all duration-500 ease-in-out ${
      isVisible 
        ? 'top-0 opacity-100 translate-y-0' 
        : '-top-[calc(8vh+14px)] opacity-0 -translate-y-full'
    }`}>
      {/* Navbar */}
      <nav className={`w-full shadow-lg flex items-center justify-between px-8 h-[8vh] backdrop-blur-md transition-colors duration-1000 ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-[#1a214a]'
      }`}>
        <span className={`font-extrabold text-2xl tracking-widest drop-shadow-lg select-none transition-colors duration-300 ${
          theme === 'dark' ? 'text-blue-300' : 'text-blue-200'
        }`}>DLUT-EDA 足球社</span>
        
        <div className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            {sections.map(section => (
              <li
                key={section.name}
                onClick={() => scrollToSection(section.id)}
                className={`relative font-semibold text-lg px-5 py-2 rounded-xl transition-all duration-300 cursor-pointer select-none
                  hover:scale-105
                  ${activeSection === section.id 
                    ? 'bg-gradient-to-r from-cyan-400 via-orange-500 to-purple-900 bg-clip-text text-transparent scale-110 font-bold' 
                    : `${theme === 'dark' ? 'text-gray-200 hover:text-blue-300' : 'text-white hover:text-blue-300'}`
                  }`}
              >
                <span className="inline-block align-middle transition-all duration-300">
                  {section.name}
                </span>
              </li>
            ))}
          </ul>
          
          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              theme === 'dark' 
                ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' 
                : 'bg-blue-800 hover:bg-blue-700 text-yellow-300'
            }`}
            title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
          >
            {theme === 'dark' ? (
              // 太阳图标 (浅色模式)
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              // 月亮图标 (深色模式)
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      
      {/* 渐变装饰条 - 作为整体的一部分 */}
      <div className="w-full h-[14px] bg-gradient-to-r from-cyan-400 via-orange-500 to-purple-900 animate-gradient-x"></div>
    </div>
  );
}
