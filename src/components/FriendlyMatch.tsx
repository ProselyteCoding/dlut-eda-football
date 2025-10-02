'use client';

// 日常友谊赛
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';

export default function FriendlyMatch() {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 text-center">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 transition-colors ${
          theme === 'dark' ? 'text-green-400' : 'text-green-700'
        }`}>
          日常友谊赛
        </h1>
        <div className={`rounded-xl p-6 md:p-8 lg:p-12 mb-6 md:mb-8 border transition-all duration-300 ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 transition-colors ${textColors[theme].primary}`}>周末足球聚会</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>活动时间</h3>
              <p className={`text-sm md:text-base transition-colors ${textColors[theme].secondary}`}>每周六、周日下午</p>
            </div>
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>活动地点</h3>
              <p className={`text-sm md:text-base transition-colors ${textColors[theme].secondary}`}>学校足球场</p>
            </div>
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>参与方式</h3>
              <p className={`text-sm md:text-base transition-colors ${textColors[theme].secondary}`}>自由组队，随到随踢</p>
            </div>
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>人数要求</h3>
              <p className={`text-sm md:text-base transition-colors ${textColors[theme].secondary}`}>6人即可开赛</p>
            </div>
          </div>
          
          <div className={`mt-6 md:mt-8 p-4 md:p-6 rounded-lg transition-all duration-300 ${
            theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'
          }`}>
            <h3 className={`text-lg md:text-xl font-semibold mb-3 transition-colors ${textColors[theme].primary}`}>活动特色</h3>
            <ul className={`text-sm md:text-base space-y-2 transition-colors ${textColors[theme].secondary}`}>
              <li>⚽ 无需报名，自由参与</li>
              <li>🤝 结识志同道合的球友</li>
              <li>🏃 保持良好的运动习惯</li>
              <li>🎯 提升个人技术水平</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
