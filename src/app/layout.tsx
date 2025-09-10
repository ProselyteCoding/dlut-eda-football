// Next.js App Router 主布局文件，集成 Navbar、Sidebar、Footer
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-cn">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <div className="fixed top-[11vh] left-0 w-full h-[14px] z-40 bg-gradient-to-r from-cyan-400 via-orange-500 to-purple-900 animate-gradient-x"></div>
        <main className="flex-1 p-6 mt-[11vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Navbar() {
  const pages = [
    { name: '首页' },
    { name: '关于' },
    { name: '新闻' },
    { name: '球星卡DIY' },
    { name: '鸣谢' }
  ];
  // 激活页示例，可后续用路由状态控制
  const activePage = '首页';
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#1a214a] shadow-lg flex items-center px-8 h-[11vh] backdrop-blur-md">
      <span className="text-blue-200 font-extrabold text-2xl tracking-widest drop-shadow-lg select-none">DLUT足球社</span>
      <ul className="flex space-x-6 ml-20">
        {pages.map(page => (
          <li
            key={page.name}
            className={`text-white font-semibold text-lg px-5 py-2 rounded-xl transition-all duration-300 cursor-pointer select-none
              hover:text-blue-300 hover:scale-105
              ${activePage === page.name ? 'text-blue-400 scale-110 font-bold' : ''}`}
            style={{boxShadow: activePage === page.name ? '0 2px 12px 0 rgba(30,33,74,0.12)' : undefined}}
          >
            <span className="inline-block align-middle transition-all duration-300 hover:animate-nav-text">{page.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}


function Footer() {
  return (
    <footer className="w-full bg-[#1a214a] text-center py-4 text-sm text-white mt-auto border-t border-white" style={{height:'50vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      Made with ❤️ by Yifan Wang from Dalian University of Technology, OurEDA.
    </footer>
  );
}
