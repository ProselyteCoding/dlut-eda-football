// 新闻
export default function News() {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
          新闻资讯
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">最新比赛结果</h3>
            <p className="text-gray-600">DLUT足球社在最近的友谊赛中表现出色...</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">训练通知</h3>
            <p className="text-gray-600">本周足球训练时间调整通知...</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">社团活动</h3>
            <p className="text-gray-600">即将举办的足球社团活动预告...</p>
          </div>
        </div>
      </div>
    </section>
  );
}