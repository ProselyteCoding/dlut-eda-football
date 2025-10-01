// 主题配色方案
export const themeColors = {
  light: {
    // 浅色主题：活力而不刺激
    news: 'from-sky-50 to-blue-100',
    activities: 'from-amber-50 to-yellow-100', 
    dutcup: 'from-emerald-50 to-green-100',
    schoolcup: 'from-purple-50 to-violet-100',
    checkin: 'from-cyan-50 to-teal-100',
    contact: 'from-slate-100 to-gray-200',
    carddiy: 'from-indigo-100 via-blue-100 to-slate-200'
  },
  dark: {
    // 深色主题：现代酷炫，避免土色调
    news: 'from-slate-900 via-blue-900 to-indigo-900',
    activities: 'from-slate-900 via-orange-800 to-red-900', 
    dutcup: 'from-slate-900 via-teal-800 to-cyan-900', 
    schoolcup: 'from-slate-900 via-indigo-800 to-blue-900',
    checkin: 'from-slate-900 via-sky-800 to-blue-900',
    contact: 'from-slate-900 via-gray-800 to-slate-800',
    carddiy: 'from-indigo-900 via-purple-900 to-slate-900'
  }
};

// 文字颜色和卡片配置
export const textColors = {
  light: {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    accent: 'text-blue-600',
    card: 'bg-white',
    cardBorder: 'border-gray-200',
    cardShadow: 'shadow-lg hover:shadow-xl',
    statCard: 'bg-blue-50 border border-blue-100',
    input: 'bg-white border-gray-300 text-gray-900 focus:border-blue-500',
    label: 'text-gray-700'
  },
  dark: {
    primary: 'text-gray-100',
    secondary: 'text-gray-300', 
    accent: 'text-cyan-400',
    card: 'bg-slate-800 bg-opacity-95 backdrop-blur-sm',
    cardBorder: 'border-slate-600',
    cardShadow: 'shadow-2xl hover:shadow-blue-500/20',
    statCard: 'bg-slate-700 bg-opacity-90 border border-slate-600 hover:border-cyan-500/50',
    input: 'bg-slate-700 bg-opacity-50 border-slate-600 text-gray-100 focus:border-cyan-400',
    label: 'text-gray-300'
  }
};

// 装饰性元素配置
export const decorativeElements = {
  light: {
    accent1: 'bg-gradient-to-r from-blue-400 to-cyan-400',
    accent2: 'bg-gradient-to-r from-purple-400 to-pink-400',
    accent3: 'bg-gradient-to-r from-green-400 to-teal-400',
    glowEffect: '',
    particleColor: 'text-gray-300'
  },
  dark: {
    accent1: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    accent2: 'bg-gradient-to-r from-purple-500 to-pink-400', 
    accent3: 'bg-gradient-to-r from-teal-500 to-green-400',
    glowEffect: 'shadow-2xl shadow-blue-500/30',
    particleColor: 'text-blue-400/30'
  }
};