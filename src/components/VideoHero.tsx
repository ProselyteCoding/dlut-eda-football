'use client';
import React, { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function VideoHero() {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  // 平滑滚动到新闻模块
  const scrollToNews = () => {
    const newsSection = document.getElementById('news');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 全屏背景视频 */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>

      {/* 备用渐变背景 - 当视频未加载时显示 */}
      <div 
        className={`absolute inset-0 transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900'
            : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600'
        }`}
      />

      {/* 视频遮罩层 - 提高文字可读性 */}
      <div 
        className={`absolute inset-0 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-black/30' 
            : 'bg-black/20'
        }`}
      />

      {/* 内容层 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center space-y-6 mb-12">
          {/* 主标题 */}
          <h1 
            className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]'
                : 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]'
            }`}
          >
            大连理工大学开发区校区
          </h1>
          
          {/* 副标题 */}
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                : 'text-blue-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]'
            }`}
          >
            足球社
          </h2>

          {/* 描述文字 */}
          <p 
            className={`text-lg sm:text-xl lg:text-2xl font-medium max-w-3xl mx-auto transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-gray-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]'
                : 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
            }`}
          >
            热爱足球 | 团结拼搏 | 青春无悔
          </p>
        </div>

        {/* 按钮 */}
        <button
          onClick={scrollToNews}
          className={`group relative px-10 py-4 text-lg sm:text-xl font-bold rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_8px_24px_rgba(6,182,212,0.5)]'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white shadow-[0_8px_24px_rgba(59,130,246,0.5)]'
          }`}
        >
          {/* 按钮背景动画 */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          {/* 按钮文字 */}
          <span className="relative flex items-center gap-2">
            探索更多
            <svg 
              className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </span>
        </button>

        {/* 滚动提示动画 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className={`w-8 h-8 ${
              theme === 'dark' ? 'text-cyan-300' : 'text-white'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
