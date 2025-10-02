'use client';

import { useState, useEffect, useRef } from 'react';
import AutumnCup from './AutumnCup';
import FriendlyMatch from './FriendlyMatch';
import ChampionsLeague from './ChampionsLeague';

export default function ActivitiesContainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [horizontalProgress, setHorizontalProgress] = useState(0); // 0-1，表示横向移动进度
  const [containerHeight, setContainerHeight] = useState(3000); // PC端容器高度
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  // 检测移动端和计算容器高度
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // PC端：容器高度 = 1个视口高度（sticky区域）+ 2个视口宽度（横向滚动距离）
      if (!mobile) {
        setContainerHeight(window.innerHeight + window.innerWidth * 2);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // PC端：监听滚动，控制横向移动
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // 横向滚动需要的总距离（2个视口宽度，因为有3个section）
      const scrollDistance = window.innerWidth * 2;
      
      // 关键：当容器顶部到达视口顶部时，开始横向滚动阶段
      if (rect.top <= 0) {
        // 容器已经sticky在顶部，现在计算横向移动的进度
        const scrolledPastTop = -rect.top; // 已经滚动过顶部的距离
        
        if (scrolledPastTop <= scrollDistance) {
          // 在横向滚动区域内
          const progress = scrolledPastTop / scrollDistance;
          setHorizontalProgress(Math.max(0, Math.min(1, progress)));
        } else {
          // 已经滚动完横向内容，固定在最后一个section
          setHorizontalProgress(1);
        }
      } else {
        // 容器还未到达顶部，保持在第一个section
        setHorizontalProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // 移动端：切换section
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const sections = [
    { id: 'autumn-cup', component: <AutumnCup />, title: '金秋杯' },
    { id: 'friendly-match', component: <FriendlyMatch />, title: '友谊赛' },
    { id: 'champions-league', component: <ChampionsLeague />, title: '欧冠聚会' },
  ];

  if (isMobile) {
    // 移动端：轮播效果
    return (
      <section id="activities" className="relative min-h-[80vh] md:min-h-screen w-full overflow-hidden">
        {/* 三个section，通过transform移动 */}
        <div 
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex-shrink-0 w-full h-full min-h-[80vh]"
            >
              {section.component}
            </div>
          ))}
        </div>

        {/* 左右切换按钮 */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="上一个活动"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="下一个活动"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 指示器 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`切换到${sections[index].title}`}
            />
          ))}
        </div>
      </section>
    );
  }

  // PC端：通过transform控制横向移动
  return (
    <section 
      id="activities" 
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${containerHeight}px` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={scrollContentRef}
          className="flex h-full w-[300vw]"
          style={{ 
            transform: `translateX(-${horizontalProgress * 200}vw)`,
            willChange: horizontalProgress > 0 && horizontalProgress < 1 ? 'transform' : 'auto'
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex-shrink-0 w-screen h-full"
            >
              {section.component}
            </div>
          ))}
        </div>
      </div>

      {/* 调试指示器 - 供调试使用
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 bg-black/80 text-white p-4 rounded-lg text-sm font-mono z-50">
          <div>进度: {(horizontalProgress * 100).toFixed(1)}%</div>
          <div>Section: {Math.floor(horizontalProgress * 3) + 1}/3</div>
        </div>
      )} */}
    </section>
  );
}
