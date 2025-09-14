// 橙锋杯
export default function DutCup() {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold text-purple-800 mb-8">
          橙锋杯足球赛
        </h1>
        <div className="bg-white rounded-xl shadow-2xl p-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">精英赛事</h2>
          <div className="text-lg text-gray-700 leading-relaxed mb-8">
            橙锋杯是大连理工大学最具竞争力的足球赛事之一，汇聚了各学院的精英球队。
            这项赛事不仅展现了同学们的足球技艺，更体现了团队合作的精神。
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">高水平竞技</h3>
              <p className="text-gray-700">各学院顶尖球员参与</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">专业裁判</h3>
              <p className="text-gray-700">严格按照比赛规则执行</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">丰厚奖励</h3>
              <p className="text-gray-700">优胜队伍获得荣誉证书</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}