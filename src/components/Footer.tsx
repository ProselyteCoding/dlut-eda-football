// Footer - 占用页面下部分
export default function Footer() {
  return (
    <footer className="h-[20vh] w-full bg-[#1a214a] text-white border-t border-white flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-lg font-semibold mb-2">
          大连理工大学开发区校区足球社
        </div>
        <div className="text-sm opacity-80 mb-1">
          Made with ❤️ by Proselyte
        </div>
        <div className="text-xs opacity-60">
          Dalian University of Technology, OurEDA
        </div>
      </div>
    </footer>
  );
}
