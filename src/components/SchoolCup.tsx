// 大工杯
export default function SchoolCup() {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-green-800 mb-8">
          大工杯足球赛
        </h1>
        <div className="bg-white rounded-xl shadow-2xl p-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">校园最高荣誉</h2>
          <div className="text-lg text-gray-700 leading-relaxed mb-8">
            大工杯是大连理工大学历史最悠久、影响力最大的足球赛事。
            每年都吸引全校最优秀的足球队伍参与角逐这一最高荣誉。
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-green-100 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-800 mb-2">32</div>
              <p className="text-gray-700">参赛队伍</p>
            </div>
            <div className="bg-green-100 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-800 mb-2">3</div>
              <p className="text-gray-700">比赛周期（周）</p>
            </div>
            <div className="bg-green-100 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-800 mb-2">500+</div>
              <p className="text-gray-700">参与球员</p>
            </div>
            <div className="bg-green-100 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-800 mb-2">15</div>
              <p className="text-gray-700">举办届数</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}