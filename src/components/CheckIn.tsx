'use client';

// 打卡
import ThemedSection from './ThemedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';

export default function CheckIn() {
  const { theme } = useTheme();
  return (
    <ThemedSection sectionKey="checkin">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className={`text-6xl font-bold mb-8 transition-colors ${textColors[theme].primary}`}>
          训练打卡
        </h1>
        <div className={`rounded-xl p-12 transition-all duration-300 ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
          <h2 className={`text-3xl font-semibold mb-6 transition-colors ${textColors[theme].primary}`}>记录你的足球之路</h2>
          <div className={`text-lg leading-relaxed mb-8 transition-colors ${textColors[theme].secondary}`}>
            坚持训练，记录成长。每一次打卡都是向梦想迈进的一步。
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <h3 className={`text-2xl font-bold mb-2 transition-colors ${textColors[theme].accent}`}>今日训练</h3>
              <p className={`text-lg transition-colors ${textColors[theme].primary}`}>已打卡 ✓</p>
              <div className="mt-4">
                <span className={`text-sm transition-colors ${textColors[theme].secondary}`}>训练时长: 2小时</span>
              </div>
            </div>
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <h3 className={`text-2xl font-bold mb-2 transition-colors ${textColors[theme].accent}`}>本周统计</h3>
              <p className={`text-lg transition-colors ${textColors[theme].primary}`}>5/7 天</p>
              <div className="mt-4">
                <span className={`text-sm transition-colors ${textColors[theme].secondary}`}>完成度: 71%</span>
              </div>
            </div>
          </div>
          
          <button className={`px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/25' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}>
            立即打卡
          </button>
        </div>
      </div>
    </ThemedSection>
  );
}