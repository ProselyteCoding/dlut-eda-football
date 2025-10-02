'use client';

// 橙锋杯
import ThemedSection from './ThemedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';

export default function DutCup() {
  const { theme } = useTheme();
  return (
    <ThemedSection sectionKey="schoolcup">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8 text-center">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 lg:mb-8 transition-colors ${textColors[theme].primary}`}>
          橙锋杯足球赛
        </h1>
        <div className={`rounded-xl p-6 md:p-8 lg:p-12 transition-all duration-300 ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6 transition-colors ${textColors[theme].primary}`}>精英赛事</h2>
          <div className={`text-base md:text-lg leading-relaxed mb-6 md:mb-8 transition-colors ${textColors[theme].secondary}`}>
            橙锋杯是大连理工大学最具竞争力的足球赛事之一，汇聚了各学院的精英球队。
            这项赛事不仅展现了同学们的足球技艺，更体现了团队合作的精神。
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${textColors[theme].accent}`}>高水平竞技</h3>
              <p className={`transition-colors ${textColors[theme].secondary}`}>各学院顶尖球员参与</p>
            </div>
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${textColors[theme].accent}`}>专业裁判</h3>
              <p className={`transition-colors ${textColors[theme].secondary}`}>严格按照比赛规则执行</p>
            </div>
            <div className={`rounded-lg p-6 transition-all duration-300 ${textColors[theme].statCard}`}>
              <h3 className={`text-xl font-semibold mb-3 transition-colors ${textColors[theme].accent}`}>丰厚奖励</h3>
              <p className={`transition-colors ${textColors[theme].secondary}`}>优胜队伍获得荣誉证书</p>
            </div>
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}