'use client';

//  大工杯
import ThemedSection from './ThemedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';

export default function SchoolCup() {
  const { theme } = useTheme();
  return (
    <ThemedSection sectionKey="dutcup">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 text-center">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 transition-colors ${textColors[theme].primary}`}>
          大工杯足球赛
        </h1>
        <div className={`rounded-xl p-6 md:p-8 lg:p-12 transition-all duration-300 ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 transition-colors ${textColors[theme].primary}`}>校园最高荣誉</h2>
          <div className={`text-base md:text-lg leading-relaxed mb-6 md:mb-8 transition-colors ${textColors[theme].secondary}`}>
            大工杯是大连理工大学历史最悠久、影响力最大的足球赛事。
            每年都吸引全校最优秀的足球队伍参与角逐这一最高荣誉。
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <div className={`text-3xl font-bold mb-2 transition-colors ${textColors[theme].accent}`}>32</div>
              <p className={`transition-colors ${textColors[theme].secondary}`}>参赛队伍</p>
            </div>
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <div className={`text-3xl font-bold mb-2 transition-colors ${textColors[theme].accent}`}>3</div>
              <p className={`transition-colors ${textColors[theme].secondary}`}>比赛周期（周）</p>
            </div>
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <div className={`text-3xl font-bold mb-2 transition-colors ${textColors[theme].accent}`}>500+</div>
              <p className={`transition-colors ${textColors[theme].secondary}`}>参与球员</p>
            </div>
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <div className={`text-3xl font-bold mb-2 transition-colors ${textColors[theme].accent}`}>15</div>
              <p className={`transition-colors ${textColors[theme].secondary}`}>举办届数</p>
            </div>
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}