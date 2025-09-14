'use client';
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// 球星卡DIY
export default function CardDIY() {
  // 图片元素引用
  const imgRef = useRef<HTMLDivElement>(null);
  // 图片容器元素引用
  const containerRef = useRef<HTMLDivElement>(null);

  // 状态管理
  const [isDragging, setIsDragging] = useState(false);
  const [imgSize] = useState({ width: 120, height: 120 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 球员数据
  const [playerData, setPlayerData] = useState({
    name: "张三",
    overall: 88,
    pac: 85,
    sho: 87,
    pas: 82,
    dri: 90,
    def: 45,
    phy: 83,
    position: "ST",
    nation: "中国",
    league: "中超",
    club: "大连人",
  });

  const [tempInputData, setTempInputData] = useState({ ...playerData });

  // 拖动处理
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (imgRef.current) {
      const imgRect = imgRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - imgRect.left,
        y: e.clientY - imgRect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imgRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      let x = e.clientX - offset.x;
      let y = e.clientY - offset.y;

      // 限制拖动范围
      const maxX = containerRect.width - imgSize.width;
      const maxY = containerRect.height - imgSize.height;
      
      x = Math.max(0, Math.min(x - containerRect.left, maxX));
      y = Math.max(0, Math.min(y - containerRect.top, maxY));

      imgRef.current.style.left = `${x}px`;
      imgRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempInputData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'position' || name === 'nation' || name === 'league' || name === 'club' 
        ? value 
        : parseInt(value) || 0
    }));
  };

  // 保存数据
  const handleSaveData = () => {
    setPlayerData({ ...tempInputData });
  };

  // 生成图片
  const handleGenerateImage = async () => {
    if (containerRef.current) {
      try {
        // 这里可以集成html2canvas等库来生成图片
        alert('图片生成功能需要集成html2canvas库');
      } catch (error) {
        console.error('生成图片失败:', error);
      }
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section className="h-screen w-full bg-gradient-to-br from-pink-50 to-rose-100 flex overflow-hidden">
      {/* 左侧：球星卡预览 */}
      <div className="w-2/5 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-800 mb-4">球星卡DIY</h1>
          <div
            ref={containerRef}
            className="relative w-72 h-80 bg-gradient-to-br from-blue-900 via-purple-800 to-pink-700 rounded-xl shadow-2xl overflow-hidden border-4 border-yellow-400"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* 可拖动的头像 */}
            <div
              ref={imgRef}
              className="absolute cursor-move bg-white rounded-full border-2 border-white flex items-center justify-center overflow-hidden"
              style={{
                width: `${imgSize.width}px`,
                height: `${imgSize.height}px`,
                left: '20px',
                top: '40px',
              }}
              onMouseDown={handleMouseDown}
            >
              <Image
                src="/file.svg"
                alt="球员头像"
                width={imgSize.width - 4}
                height={imgSize.height - 4}
                className="object-cover"
                draggable={false}
              />
            </div>

            {/* 球员信息显示 */}
            <div className="absolute inset-0 text-white">
              {/* 总评 */}
              <div className="absolute top-4 left-4 text-4xl font-bold text-yellow-300">
                {playerData.overall}
              </div>
              
              {/* 位置 */}
              <div className="absolute top-14 left-4 text-lg font-semibold">
                {playerData.position}
              </div>

              {/* 球员姓名 */}
              <div className="absolute bottom-20 left-4 right-4 text-center text-xl font-bold bg-black bg-opacity-50 py-1 rounded">
                {playerData.name}
              </div>

              {/* 能力值 */}
              <div className="absolute bottom-12 left-2 right-2 flex justify-between text-xs">
                <div className="text-center">
                  <div>PAC</div>
                  <div className="font-bold">{playerData.pac}</div>
                </div>
                <div className="text-center">
                  <div>SHO</div>
                  <div className="font-bold">{playerData.sho}</div>
                </div>
                <div className="text-center">
                  <div>PAS</div>
                  <div className="font-bold">{playerData.pas}</div>
                </div>
                <div className="text-center">
                  <div>DRI</div>
                  <div className="font-bold">{playerData.dri}</div>
                </div>
                <div className="text-center">
                  <div>DEF</div>
                  <div className="font-bold">{playerData.def}</div>
                </div>
                <div className="text-center">
                  <div>PHY</div>
                  <div className="font-bold">{playerData.phy}</div>
                </div>
              </div>

              {/* 俱乐部信息 */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs">
                <span>{playerData.nation}</span>
                <span>{playerData.league}</span>
                <span>{playerData.club}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧：控制面板 */}
      <div className="w-3/5 bg-[#1a214a] text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">编辑球员信息</h2>
        
        <div className="space-y-4">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">姓名</label>
              <input
                type="text"
                name="name"
                value={tempInputData.name}
                onChange={handleInputChange}
                className="w-full p-2 text-sm rounded bg-[#2c3774] border border-gray-600 focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">总评</label>
              <input
                type="number"
                name="overall"
                value={tempInputData.overall}
                onChange={handleInputChange}
                min="1"
                max="99"
                className="w-full p-2 text-sm rounded bg-[#2c3774] border border-gray-600 focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* 能力值 */}
          <div>
            <h3 className="text-sm font-semibold mb-2">能力值</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'pac', label: 'PAC' },
                { key: 'sho', label: 'SHO' },
                { key: 'pas', label: 'PAS' },
                { key: 'dri', label: 'DRI' },
                { key: 'def', label: 'DEF' },
                { key: 'phy', label: 'PHY' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1">{label}</label>
                  <input
                    type="number"
                    name={key}
                    value={tempInputData[key as keyof typeof tempInputData]}
                    onChange={handleInputChange}
                    min="1"
                    max="99"
                    className="w-full p-1 text-xs rounded bg-[#2c3774] border border-gray-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 俱乐部信息 */}
          <div>
            <h3 className="text-sm font-semibold mb-2">俱乐部信息</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1">位置</label>
                <input
                  type="text"
                  name="position"
                  value={tempInputData.position}
                  onChange={handleInputChange}
                  className="w-full p-1 text-xs rounded bg-[#2c3774] border border-gray-600 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">国籍</label>
                <input
                  type="text"
                  name="nation"
                  value={tempInputData.nation}
                  onChange={handleInputChange}
                  className="w-full p-1 text-xs rounded bg-[#2c3774] border border-gray-600 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">联赛</label>
                <input
                  type="text"
                  name="league"
                  value={tempInputData.league}
                  onChange={handleInputChange}
                  className="w-full p-1 text-xs rounded bg-[#2c3774] border border-gray-600 focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">俱乐部</label>
                <input
                  type="text"
                  name="club"
                  value={tempInputData.club}
                  onChange={handleInputChange}
                  className="w-full p-1 text-xs rounded bg-[#2c3774] border border-gray-600 focus:border-pink-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 头像上传 */}
          <div>
            <label className="block text-xs font-medium mb-1">上传头像</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-1 text-xs rounded bg-[#2c3774] border border-gray-600 focus:border-pink-500 focus:outline-none file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-pink-600 file:text-white file:cursor-pointer"
            />
          </div>

          {/* 操作按钮 */}
          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleSaveData}
              className="flex-1 bg-pink-600 text-white py-2 rounded text-sm font-semibold hover:bg-pink-700 transition-colors"
            >
              保存数据
            </button>
            <button
              onClick={handleGenerateImage}
              className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-semibold hover:bg-green-700 transition-colors"
            >
              生成图片
            </button>
          </div>

          <div className="text-center text-xs text-gray-400 pt-2">
            💡 提示：点击左侧卡片上的头像可以拖动位置
          </div>
        </div>
      </div>
    </section>
  );
}