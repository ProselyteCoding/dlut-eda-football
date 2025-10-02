'use client';

// 联系方式 - 占用页面上部分
import ThemedSection from './ThemedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';

export default function Contact() {
  const { theme } = useTheme();
  
  return (
    <ThemedSection sectionKey="contact" className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 transition-colors ${textColors[theme].primary}`}>联系我们</h1>
        <div className={`rounded-xl p-4 md:p-6 border transition-all duration-300 ${textColors[theme].card} ${textColors[theme].cardBorder} ${textColors[theme].cardShadow}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className={`text-base md:text-lg font-semibold mb-2 transition-colors ${textColors[theme].primary}`}>社团联系方式</h3>
              <div className={`text-sm space-y-1 transition-colors ${textColors[theme].secondary}`}>
                <p>📧 邮箱: dlut.football@edu.cn</p>
                <p>📱 微信群: 扫描二维码加入</p>
                <p>📍 地址: 大连理工大学体育场</p>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-2 transition-colors ${textColors[theme].primary}`}>训练时间</h3>
              <div className={`text-sm space-y-1 transition-colors ${textColors[theme].secondary}`}>
                <p>🏃 周二: 16:00-18:00</p>
                <p>🏃 周四: 16:00-18:00</p>
                <p>⚽ 周六: 14:00-17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}
