# 活动部分横向滚动实现说明

## 📐 实现原理

### PC端横向滚动机制

#### 1. 容器结构
```
<section> (高度: 100vh + 2倍视口宽度)
  └─ <div sticky> (固定在视口顶部)
      └─ <div 300vw> (3个section的容器，通过transform移动)
          ├─ Section 1 (100vw)
          ├─ Section 2 (100vw)
          └─ Section 3 (100vw)
```

#### 2. 滚动阶段

**阶段1: 向下滚动到活动区域**
- 用户正常滚动页面
- 当活动section的顶部到达视口顶部时，section变为sticky
- `horizontalProgress = 0`，显示第一个section

**阶段2: 横向移动（竖直滚动 → 横向视觉移动）**
- Section固定在视口顶部（sticky效果）
- 继续向下滚动，计算滚动距离
- 通过`transform: translateX()`控制横向位置
- `horizontalProgress`: 0 → 1 (对应移动0vw → 200vw)
- 需要滚动距离：2倍视口宽度

**阶段3: 完成横向移动**
- `horizontalProgress = 1`，显示第三个section
- 继续向下滚动，离开活动区域
- 进入下一个内容区域

#### 3. 向上滚动
- 如果`horizontalProgress > 0`：反向执行横向移动
- 如果`horizontalProgress = 0`：自由向上滚动，查看之前的内容

## 🔧 关键代码

### 滚动检测
```typescript
if (rect.top <= 0) {
  // 容器已经sticky在顶部
  const scrolledPastTop = -rect.top;
  
  if (scrolledPastTop <= scrollDistance) {
    // 在横向滚动区域内
    const progress = scrolledPastTop / scrollDistance;
    setHorizontalProgress(progress);
  } else {
    // 已完成横向滚动
    setHorizontalProgress(1);
  }
} else {
  // 容器还未到达顶部
  setHorizontalProgress(0);
}
```

### 横向移动
```typescript
style={{ transform: `translateX(-${horizontalProgress * 200}vw)` }}
// horizontalProgress: 0 → 移动0vw (第1个section)
// horizontalProgress: 0.5 → 移动100vw (第2个section)
// horizontalProgress: 1 → 移动200vw (第3个section)
```

## 🐛 问题诊断

### 如何验证功能是否正常？

1. **打开开发服务器**，右上角会显示调试信息
2. **滚动到活动区域**，观察进度百分比
3. **继续向下滚动**，应该看到：
   - 进度从0%逐渐增加到100%
   - Section从1切换到2再到3
   - 视觉上横向移动

### 常见问题

**问题1: 卡顿**
- 原因：transition-transform可能导致卡顿
- 解决：已移除transition，直接使用transform
- 优化：添加了`willChange: 'transform'`

**问题2: 向上滚动不自由**
- 原因：逻辑错误，progress > 0时阻止向上滚动
- 解决：仅当`rect.top <= 0`时才控制progress
- 效果：progress = 0时可以自由向上滚动

**问题3: 延迟触发**
- 原因：容器高度计算错误
- 解决：容器高度 = 视口高度 + 2倍视口宽度
- 效果：立即开始横向移动

## 📱 移动端

移动端使用完全不同的机制：
- 轮播式切换（按钮控制）
- CSS transition实现平滑过渡
- 无横向滚动逻辑

## 🎯 下一步优化

如果仍然有问题，可以尝试：

1. **调整容器高度**：增加或减少滚动距离
2. **使用requestAnimationFrame**：更平滑的动画
3. **添加缓动函数**：自定义滚动曲线
4. **优化性能**：使用CSS transform3d
