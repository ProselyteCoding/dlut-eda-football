'use client';
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { message } from 'antd';
import html2canvas from 'html2canvas-pro';
import ThemedSection from './ThemedSection';
import { useTheme } from '@/contexts/ThemeContext';
import { textColors } from '@/utils/theme';
import { useCardStore } from '@/store/cardStore';
import { saveAvatarToIndexedDB, getAvatarFromIndexedDB, revokeObjectURL } from '@/lib/indexedDB';

// 球星卡DIY
export default function CardDIY() {
  const { theme } = useTheme();
  const [messageApi, contextHolder] = message.useMessage();
  
  // 使用 Zustand store
  const tempCard = useCardStore((state) => state.tempCard);
  const updateTempCard = useCardStore((state) => state.updateTempCard);
  const saveCard = useCardStore((state) => state.saveCard);
  const updateAvatarPosition = useCardStore((state) => state.updateAvatarPosition);
  const updateAvatarImage = useCardStore((state) => state.updateAvatarImage);
  const updateAvatarSize = useCardStore((state) => state.updateAvatarSize);
  
  // 确保 avatarSize 有默认值
  const avatarSize = tempCard.avatarSize || { width: 120, height: 120 };
  const avatarPosition = tempCard.avatarPosition || { x: 68, y: 60 };
  
  // 图片元素引用
  const imgRef = useRef<HTMLDivElement>(null);
  // 图片容器元素引用
  const containerRef = useRef<HTMLDivElement>(null);
  // 球星卡预览区域引用（用于截图）
  const cardRef = useRef<HTMLDivElement>(null);
  // 标记是否已经加载过图片
  const hasLoadedRef = useRef(false);

  // 状态管理
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState<'tl' | 'tr' | 'bl' | 'br' | null>(null);
  const [resizeStart, setResizeStart] = useState({ 
    x: 0, 
    y: 0, 
    width: 0, 
    height: 0,
    posX: 0, // 初始位置 X
    posY: 0, // 初始位置 Y
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // 拖动处理
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (imgRef.current && containerRef.current) {
      const imgRect = imgRef.current.getBoundingClientRect();
      
      // 计算鼠标相对于图片的偏移
      setOffset({
        x: e.clientX - imgRect.left,
        y: e.clientY - imgRect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imgRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // 计算新位置（相对于容器）
      let newX = e.clientX - containerRect.left - offset.x;
      let newY = e.clientY - containerRect.top - offset.y;

      // 限制拖动范围
      const maxX = containerRect.width - avatarSize.width;
      const maxY = containerRect.height - avatarSize.height;
      
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      // 更新位置状态到 store（实时同步）
      updateAvatarPosition({ x: newX, y: newY });
    }

    // 处理缩放
    if (isResizing && resizeCorner && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = resizeStart.posX; // 使用初始位置
      let newY = resizeStart.posY;

      // 根据不同角落计算新尺寸和位置
      switch (resizeCorner) {
        case 'br': // 右下角 - 左上角固定
          newWidth = Math.max(50, resizeStart.width + deltaX);
          newHeight = Math.max(50, resizeStart.height + deltaY);
          // 位置不变
          break;
        case 'bl': // 左下角 - 右上角固定
          newWidth = Math.max(50, resizeStart.width - deltaX);
          newHeight = Math.max(50, resizeStart.height + deltaY);
          // 位置需要根据宽度变化调整
          newX = resizeStart.posX + (resizeStart.width - newWidth);
          break;
        case 'tr': // 右上角 - 左下角固定
          newWidth = Math.max(50, resizeStart.width + deltaX);
          newHeight = Math.max(50, resizeStart.height - deltaY);
          // 位置需要根据高度变化调整
          newY = resizeStart.posY + (resizeStart.height - newHeight);
          break;
        case 'tl': // 左上角 - 右下角固定
          newWidth = Math.max(50, resizeStart.width - deltaX);
          newHeight = Math.max(50, resizeStart.height - deltaY);
          // 位置需要根据宽高变化调整
          newX = resizeStart.posX + (resizeStart.width - newWidth);
          newY = resizeStart.posY + (resizeStart.height - newHeight);
          break;
      }

      // 限制最大尺寸和边界
      const maxWidth = Math.min(containerRect.width - newX, 300);
      const maxHeight = Math.min(containerRect.height - newY, 300);
      
      // 如果达到边界，需要重新调整
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
      }
      
      // 确保不超出左边界和上边界
      if (newX < 0) {
        newWidth = newWidth + newX;
        newX = 0;
      }
      if (newY < 0) {
        newHeight = newHeight + newY;
        newY = 0;
      }

      // 更新尺寸和位置
      updateAvatarSize({ width: newWidth, height: newHeight });
      if (newX !== avatarPosition.x || newY !== avatarPosition.y) {
        updateAvatarPosition({ x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeCorner(null);
  };

  // 开始缩放
  const handleResizeStart = (corner: 'tl' | 'tr' | 'bl' | 'br', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeCorner(corner);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: avatarSize.width,
      height: avatarSize.height,
      posX: avatarPosition.x, // 保存初始位置
      posY: avatarPosition.y,
    });
  };

  // 处理输入变化（实时同步到 store）
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 如果是文本字段，直接使用 value
    if (name === 'name' || name === 'position' || name === 'nation' || name === 'league' || name === 'club') {
      updateTempCard({ [name]: value });
      return;
    }
    
    // 如果是数字字段，保持为字符串以便编辑，但去除前导零
    if (value === '') {
      // 空值时保持为空字符串
      updateTempCard({ [name]: '' });
    } else {
      // 移除前导零但保持为字符串，以便用户可以继续输入
      const cleanedValue = value.replace(/^0+(\d)/, '$1');
      updateTempCard({ [name]: cleanedValue });
    }
  };

  // 处理图片上传（使用 IndexedDB 存储原图）
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 先撤销旧的 ObjectURL
        if (tempCard.avatarImage && tempCard.avatarImage.startsWith('blob:')) {
          revokeObjectURL(tempCard.avatarImage);
        }
        
        // 保存到 IndexedDB，返回 ObjectURL
        const objectURL = await saveAvatarToIndexedDB(file);
        
        // 更新 store，存储 ObjectURL
        updateAvatarImage(objectURL);
        
        messageApi.success('图片上传成功');
      } catch (error) {
        console.error('图片上传失败:', error);
        messageApi.error('图片上传失败');
      }
    }
  };

  // 保存数据到 store（持久化）
  const handleSaveData = () => {
    try {
      // 在保存前确保所有数字字段都是数字类型
      const normalizedCard = {
        ...tempCard,
        overall: typeof tempCard.overall === 'string' ? (parseInt(tempCard.overall, 10) || 0) : tempCard.overall,
        pac: typeof tempCard.pac === 'string' ? (parseInt(tempCard.pac, 10) || 0) : tempCard.pac,
        sho: typeof tempCard.sho === 'string' ? (parseInt(tempCard.sho, 10) || 0) : tempCard.sho,
        pas: typeof tempCard.pas === 'string' ? (parseInt(tempCard.pas, 10) || 0) : tempCard.pas,
        dri: typeof tempCard.dri === 'string' ? (parseInt(tempCard.dri, 10) || 0) : tempCard.dri,
        def: typeof tempCard.def === 'string' ? (parseInt(tempCard.def, 10) || 0) : tempCard.def,
        phy: typeof tempCard.phy === 'string' ? (parseInt(tempCard.phy, 10) || 0) : tempCard.phy,
      };
      
      // 先更新 tempCard 为标准化的数据
      updateTempCard(normalizedCard);
      // 然后保存
      saveCard();
      
      // 显示成功提示
      messageApi.success('球星卡数据已保存！');
    } catch (error) {
      console.error('保存失败:', error);
      messageApi.error('保存失败，请重试！');
    }
  };

  // 生成图片
  const handleGenerateImage = async () => {
    if (!cardRef.current) {
      messageApi.error('球星卡预览区域未找到');
      return;
    }

    try {
      messageApi.loading('正在生成图片...', 0);
      
      // 使用 html2canvas-pro 截取球星卡区域（原生支持 lab/oklch 等现代颜色）
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, // 透明背景
        scale: 2, // 提高清晰度
        useCORS: true, // 允许跨域图片
        logging: false, // 关闭日志
        width: 320, // 固定宽度
        height: 450, // 固定高度
      });

      // 转换为图片 URL
      const dataUrl = canvas.toDataURL('image/png');
      
      // 创建下载链接
      const link = document.createElement('a');
      const fileName = `${tempCard.name || '球星卡'}_${new Date().getTime()}.png`;
      link.download = fileName;
      link.href = dataUrl;
      link.click();

      messageApi.destroy(); // 关闭 loading
      messageApi.success('图片生成成功！');
    } catch (error) {
      messageApi.destroy();
      console.error('生成图片失败:', error);
      messageApi.error('生成图片失败，请重试！');
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // 初始化时从 IndexedDB 加载图片
  useEffect(() => {
    const loadAvatarFromDB = async () => {
      // 防止重复加载
      if (hasLoadedRef.current) return;
      hasLoadedRef.current = true;
      
      try {
        const objectURL = await getAvatarFromIndexedDB();
        if (objectURL && !tempCard.avatarImage) {
          // 只在没有图片时加载
          updateAvatarImage(objectURL);
        }
      } catch (error) {
        console.error('从 IndexedDB 加载图片失败:', error);
      }
    };

    loadAvatarFromDB();

    // 组件卸载时清理 ObjectURL
    return () => {
      if (tempCard.avatarImage && tempCard.avatarImage.startsWith('blob:')) {
        revokeObjectURL(tempCard.avatarImage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemedSection sectionKey="carddiy">
      {contextHolder}
      <div className="h-screen w-full flex items-center justify-center overflow-hidden px-8">
        <div className="flex items-center gap-8 max-w-7xl">
          {/* 左侧：球星卡预览 */}
          <div className="flex-shrink-0">
            <div ref={cardRef} className="relative w-80 h-[450px]">
              {/* 背景卡片图片 */}
              <Image
                src="/images/card-background.png"
                alt="球星卡背景"
                width={320}
                height={450}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
                priority
              />
              
              {/* 数据显示区域 - 直接叠加在卡面上 */}
              <div className="absolute inset-0 px-8 pt-6">
                {/* 总评和位置 - 左上角 - 白色，继续往下、往右移动 */}
                <div className="absolute top-22 left-14">
                  <div className="text-5xl font-black leading-none mb-0.5 text-black">
                    {tempCard.overall || 0}
                  </div>
                  <div className="text-lg font-bold ml-5 text-black">
                    {tempCard.position || 'ST'}
                  </div>
                </div>

                {/* 可拖动的头像容器 - 扩大到卡片主要区域 */}
                <div
                  ref={containerRef}
                  className="absolute top-24 left-8 right-2 bottom-20"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div
                    ref={imgRef}
                    className="absolute cursor-move group"
                    style={{
                      width: `${avatarSize.width}px`,
                      height: `${avatarSize.height}px`,
                      left: `${avatarPosition.x}px`,
                      top: `${avatarPosition.y}px`,
                    }}
                    onMouseDown={handleMouseDown}
                  >
                    {/* 使用 Next.js Image 组件，支持 ObjectURL */}
                    <Image
                      src={tempCard.avatarImage}
                      alt="球员头像"
                      width={avatarSize.width}
                      height={avatarSize.height}
                      className="w-full h-full object-fill pointer-events-none select-none"
                      draggable={false}
                      unoptimized // ObjectURL 不需要优化
                    />
                    
                    {/* 四角握把 */}
                    {/* 左上角 */}
                    <div
                      className="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-nw-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onMouseDown={(e) => handleResizeStart('tl', e)}
                    />
                    {/* 右上角 */}
                    <div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-ne-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onMouseDown={(e) => handleResizeStart('tr', e)}
                    />
                    {/* 左下角 */}
                    <div
                      className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-sw-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onMouseDown={(e) => handleResizeStart('bl', e)}
                    />
                    {/* 右下角 */}
                    <div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onMouseDown={(e) => handleResizeStart('br', e)}
                    />
                  </div>
                </div>

                {/* 球员姓名 - 一行居中，字体稍微大一点 */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full text-center text-xl font-black text-black">
                  {tempCard.name}
                </div>

                {/* 能力值 - 六项排列在一行，稍微向下 */}
                <div className="absolute bottom-22 left-1/2 -translate-x-1/2 w-full flex justify-center gap-x-3 text-xs">
                  <div className="text-center text-black">
                    <div className="font-semibold opacity-70">PAC</div>
                    <div className="font-black text-base">{tempCard.pac || 0}</div>
                  </div>
                  <div className="text-center text-black">
                    <div className="font-semibold opacity-70">SHO</div>
                    <div className="font-black text-base">{tempCard.sho || 0}</div>
                  </div>
                  <div className="text-center text-black">
                    <div className="font-semibold opacity-70">PAS</div>
                    <div className="font-black text-base">{tempCard.pas || 0}</div>
                  </div>
                  <div className="text-center text-black">
                    <div className="font-semibold opacity-70">DRI</div>
                    <div className="font-black text-base">{tempCard.dri || 0}</div>
                  </div>
                  <div className="text-center text-black">
                    <div className="font-semibold opacity-70">DEF</div>
                    <div className="font-black text-base">{tempCard.def || 0}</div>
                  </div>
                  <div className="text-center text-black">
                    <div className="font-semibold opacity-70">PHY</div>
                    <div className="font-black text-base">{tempCard.phy || 0}</div>
                  </div>
                </div>

                {/* 俱乐部信息 - 最后一行：国籍、联赛、俱乐部 */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full flex justify-center gap-x-6 text-xs text-black">
                  <span className="font-bold">{tempCard.nation}</span>
                  <span className="font-bold">{tempCard.league}</span>
                  <span className="font-bold">{tempCard.club}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：控制面板 */}
          <div className="flex-shrink-0">
            <div className={`w-[500px] rounded-xl p-5 border-2 transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-900/80 backdrop-blur-md border-slate-700'
                : 'bg-white/80 backdrop-blur-md border-gray-300'
            }`}>
              <h2 className={`text-xl font-bold mb-4 transition-colors ${textColors[theme].primary}`}>
                编辑球员信息
              </h2>
              
              <div className="space-y-3">
                {/* 基本信息 - 球员名字 */}
                <div>
                  <label className={`block text-sm font-semibold mb-1.5 transition-colors ${textColors[theme].label}`}>
                    球员姓名
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={tempCard.name}
                    onChange={handleInputChange}
                    placeholder="输入球员姓名"
                    className={`w-full px-3 py-2 text-sm rounded-lg border-2 focus:outline-none transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-800 border-slate-600 text-white focus:border-cyan-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    }`}
                  />
                </div>

                {/* 总评和位置 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 transition-colors ${textColors[theme].label}`}>
                      总评
                    </label>
                    <input
                      type="number"
                      name="overall"
                      value={tempCard.overall}
                      onChange={handleInputChange}
                      min="1"
                      max="99"
                      className={`w-full px-3 py-2 text-sm rounded-lg border-2 focus:outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-cyan-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 transition-colors ${textColors[theme].label}`}>
                      位置
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={tempCard.position}
                      onChange={handleInputChange}
                      placeholder="如: ST, CAM"
                      className={`w-full px-3 py-2 text-sm rounded-lg border-2 focus:outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-cyan-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

              {/* 能力值 */}
              <div>
                <h3 className={`text-sm font-bold mb-2 transition-colors ${textColors[theme].primary}`}>
                  能力值
                </h3>
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
                      <label className={`block text-xs font-semibold mb-1 transition-colors ${textColors[theme].label}`}>
                        {label}
                      </label>
                      <input
                        type="number"
                        name={key}
                        value={tempCard[key as keyof typeof tempCard] as number}
                        onChange={handleInputChange}
                        min="1"
                        max="99"
                        className={`w-full px-2 py-1.5 text-sm rounded-lg border-2 focus:outline-none transition-all ${
                          theme === 'dark'
                            ? 'bg-slate-800 border-slate-600 text-white focus:border-cyan-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 俱乐部信息 */}
              <div>
                <h3 className={`text-sm font-bold mb-2 transition-colors ${textColors[theme].primary}`}>
                  俱乐部信息
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 transition-colors ${textColors[theme].label}`}>
                      国籍
                    </label>
                    <input
                      type="text"
                      name="nation"
                      value={tempCard.nation}
                      onChange={handleInputChange}
                      placeholder="国籍"
                      className={`w-full px-2 py-1.5 text-sm rounded-lg border-2 focus:outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-cyan-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-semibold mb-1 transition-colors ${textColors[theme].label}`}>
                      联赛
                    </label>
                    <input
                      type="text"
                      name="league"
                      value={tempCard.league}
                      onChange={handleInputChange}
                      placeholder="联赛"
                      className={`w-full px-2 py-1.5 text-sm rounded-lg border-2 focus:outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-cyan-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={`block text-xs font-semibold mb-1 transition-colors ${textColors[theme].label}`}>
                      俱乐部
                    </label>
                    <input
                      type="text"
                      name="club"
                      value={tempCard.club}
                      onChange={handleInputChange}
                      placeholder="俱乐部名称"
                      className={`w-full px-2 py-1.5 text-sm rounded-lg border-2 focus:outline-none transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-800 border-slate-600 text-white focus:border-cyan-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 头像上传 */}
              <div>
                <label className={`block text-sm font-semibold mb-1.5 transition-colors ${textColors[theme].label}`}>
                  上传头像
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={`w-full text-sm rounded-lg border-2 focus:outline-none transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800 border-slate-600 text-white file:bg-cyan-600 file:hover:bg-cyan-500'
                      : 'bg-white border-gray-300 text-gray-900 file:bg-blue-600 file:hover:bg-blue-700'
                  } file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white file:cursor-pointer`}
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSaveData}
                  className={`flex-1 text-white py-2.5 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-cyan-600 hover:bg-cyan-500 hover:shadow-cyan-500/30'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30'
                  }`}
                >
                  保存数据
                </button>
                <button
                  onClick={handleGenerateImage}
                  className={`flex-1 text-white py-2.5 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-500/30'
                      : 'bg-green-600 hover:bg-green-700 hover:shadow-green-500/30'
                  }`}
                >
                  生成图片
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </ThemedSection>
  );
}