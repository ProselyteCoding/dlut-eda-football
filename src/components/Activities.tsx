// 金秋杯
export default function Activities() {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-orange-800 mb-8">
          金秋杯足球赛
        </h1>
        <div className="bg-white rounded-xl shadow-2xl p-12 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">赛事信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">比赛时间</h3>
              <p className="text-gray-700">每年秋季学期举办</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">参赛队伍</h3>
              <p className="text-gray-700">全校各学院代表队</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">比赛形式</h3>
              <p className="text-gray-700">11人制足球比赛</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-600 mb-3">奖项设置</h3>
              <p className="text-gray-700">冠军、亚军、季军及最佳球员</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}