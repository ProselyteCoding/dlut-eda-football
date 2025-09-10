'use client';
import { useState, useEffect, useMemo } from 'react';

export default function Navbar() {
  const sections = useMemo(() => [
    { name: '新闻', id: 'news' },
    { name: '金秋杯', id: 'autumn-cup' },
    { name: '橙锋杯', id: 'orange-cup' },
    { name: '大工杯', id: 'school-cup' },
    { name: '打卡', id: 'check-in' },
    { name: '球星卡DIY', id: 'card-diy' },
    { name: '联系方式', id: 'contact' }
  ], []);

  const [activeSection, setActiveSection] = useState('news');

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#1a214a] shadow-lg flex items-center px-8 h-[8vh] backdrop-blur-md">
        <span className="text-blue-200 font-extrabold text-2xl tracking-widest drop-shadow-lg select-none">DLUT-EDA足球社</span>
        <ul className="flex space-x-6 ml-20">
          {sections.map(section => (
            <li
              key={section.name}
              onClick={() => scrollToSection(section.id)}
              className={`relative font-semibold text-lg px-5 py-2 rounded-xl transition-all duration-300 cursor-pointer select-none
                hover:scale-105
                ${activeSection === section.id 
                  ? 'bg-gradient-to-r from-cyan-400 via-orange-500 to-purple-900 bg-clip-text text-transparent scale-110 font-bold' 
                  : 'text-white hover:text-blue-300'
                }`}
            >
              <span className="inline-block align-middle transition-all duration-300">
                {section.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="fixed top-[8vh] left-0 w-full h-[14px] z-40 bg-gradient-to-r from-cyan-400 via-orange-500 to-purple-900 animate-gradient-x"></div>
    </>
  );
}
