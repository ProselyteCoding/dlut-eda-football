// 球星卡DIY
export default function CardDIY() {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-pink-800 mb-8">
          球星卡DIY
        </h1>
        <div className="bg-white rounded-xl shadow-2xl p-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">创造属于你的专属球星卡</h2>
          <div className="text-lg text-gray-700 leading-relaxed mb-8">
            设计个性化的足球球星卡片，展示你的足球风采和个人特色。
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-pink-100 rounded-lg p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-pink-800 mb-3">自定义设计</h3>
              <p className="text-gray-700">选择模板、颜色和样式</p>
            </div>
            <div className="bg-pink-100 rounded-lg p-6">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-pink-800 mb-3">上传照片</h3>
              <p className="text-gray-700">添加你的最佳比赛瞬间</p>
            </div>
            <div className="bg-pink-100 rounded-lg p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-pink-800 mb-3">数据统计</h3>
              <p className="text-gray-700">展示你的比赛数据</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button className="bg-pink-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-pink-700 transition-colors">
              开始制作
            </button>
            <button className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full text-xl font-semibold hover:bg-pink-50 transition-colors">
              查看模板
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}