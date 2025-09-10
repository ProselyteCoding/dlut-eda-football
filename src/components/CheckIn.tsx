// 打卡
export default function CheckIn() {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-cyan-800 mb-8">
          训练打卡
        </h1>
        <div className="bg-white rounded-xl shadow-2xl p-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">记录你的足球之路</h2>
          <div className="text-lg text-gray-700 leading-relaxed mb-8">
            坚持训练，记录成长。每一次打卡都是向梦想迈进的一步。
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-cyan-100 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-cyan-800 mb-2">今日训练</h3>
              <p className="text-gray-700 text-lg">已打卡 ✓</p>
              <div className="mt-4">
                <span className="text-sm text-gray-600">训练时长: 2小时</span>
              </div>
            </div>
            <div className="bg-cyan-100 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-cyan-800 mb-2">本周统计</h3>
              <p className="text-gray-700 text-lg">5/7 天</p>
              <div className="mt-4">
                <span className="text-sm text-gray-600">完成度: 71%</span>
              </div>
            </div>
          </div>
          
          <button className="bg-cyan-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-cyan-700 transition-colors">
            立即打卡
          </button>
        </div>
      </div>
    </section>
  );
}