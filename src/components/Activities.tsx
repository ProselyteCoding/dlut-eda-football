'use client';

// 金秋杯
import ThemedSection from './ThemedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';

export default function Activities() {
  const { theme } = useTheme();
  
  return (
    <ThemedSection sectionKey="activities">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className={`text-6xl font-bold mb-8 transition-colors ${
          theme === 'dark' ? 'text-orange-400' : 'text-amber-800'
        }`}>
          金秋杯足球赛
        </h1>
        <div className={`rounded-xl p-12 mb-8 border transition-all duration-300 ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
          <h2 className={`text-3xl font-semibold mb-6 transition-colors ${textColors[theme].primary}`}>赛事信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-orange-400' : 'text-amber-600'
              }`}>比赛时间</h3>
              <p className={`transition-colors ${textColors[theme].secondary}`}>每年秋季学期举办</p>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-orange-400' : 'text-amber-600'
              }`}>参赛队伍</h3>
              <p className={`transition-colors ${textColors[theme].secondary}`}>全校各学院代表队</p>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-orange-400' : 'text-amber-600'
              }`}>比赛形式</h3>
              <p className={`transition-colors ${textColors[theme].secondary}`}>11人制足球比赛</p>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${
                theme === 'dark' ? 'text-orange-400' : 'text-amber-600'
              }`}>奖项设置</h3>
              <p className={`transition-colors ${textColors[theme].secondary}`}>冠军、亚军、季军及最佳球员</p>
            </div>
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}