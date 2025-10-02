'use client';

// 欧冠决赛聚会
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';

export default function ChampionsLeague() {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 text-center">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 transition-colors ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
        }`}>
          欧冠决赛聚会
        </h1>
        <div className={`rounded-xl p-6 md:p-8 lg:p-12 mb-6 md:mb-8 border transition-all duration-300 ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 transition-colors ${textColors[theme].primary}`}>一起见证欧洲之巅</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>活动时间</h3>
              <p className={`text-sm md:text-base transition-colors ${textColors[theme].secondary}`}>每年6月欧冠决赛日</p>
            </div>
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>活动地点</h3>
              <p className={`text-sm md:text-base transition-colors ${textColors[theme].secondary}`}>足球协会活动室</p>
            </div>
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>活动内容</h3>
              <p className={`text-sm md:text-base transition-colors ${textColors[theme].secondary}`}>大屏观赛 + 互动竞猜</p>
            </div>
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>福利</h3>
              <p className={`text-sm md:text-base transition-colors ${textColors[theme].secondary}`}>免费饮料 + 神秘奖品</p>
            </div>
          </div>
          
          <div className={`mt-6 md:mt-8 p-4 md:p-6 rounded-lg transition-all duration-300 ${
            theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'
          }`}>
            <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${textColors[theme].primary}`}>精彩亮点</h3>
            <ul className={`text-sm md:text-base space-y-2 transition-colors ${textColors[theme].secondary}`}>
              <li>📺 超大屏幕，震撼观赛体验</li>
              <li>🎮 实时竞猜，赢取精美礼品</li>
              <li>🍕 精美餐饮，边吃边看</li>
              <li>⚽ 球迷狂欢，激情四射</li>
              <li>📸 合影留念，记录精彩时刻</li>
            </ul>
          </div>
          
          <div className={`mt-6 p-4 md:p-6 rounded-lg border-2 transition-all duration-300 ${
            theme === 'dark' ? 'border-blue-500 bg-blue-950/30' : 'border-blue-300 bg-blue-100'
          }`}>
            <p className={`text-base md:text-lg font-semibold transition-colors ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-700'
            }`}>
              🏆 2024年决赛：皇家马德里 vs 多特蒙德<br/>
              我们一起见证了皇马第15次捧起欧冠奖杯！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
