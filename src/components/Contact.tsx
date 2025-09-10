// 联系方式 - 占用页面上部分
export default function Contact() {
  return (
    <div className="h-[70vh] w-full bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-8">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">联系我们</h1>
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">社团联系方式</h3>
              <div className="text-base text-gray-700 space-y-2">
                <p>📧 邮箱: dlut.football@edu.cn</p>
                <p>📱 微信群: 扫描二维码加入</p>
                <p>📍 地址: 大连理工大学体育场</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">训练时间</h3>
              <div className="text-base text-gray-700 space-y-2">
                <p>🏃 周二: 16:00-18:00</p>
                <p>🏃 周四: 16:00-18:00</p>
                <p>⚽ 周六: 14:00-17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
