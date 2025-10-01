import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 球员卡片数据类型
export interface PlayerCardData {
  name: string;
  overall: number | string; // 允许空字符串用于输入过程
  pac: number | string;
  sho: number | string;
  pas: number | string;
  dri: number | string;
  def: number | string;
  phy: number | string;
  position: string;
  nation: string;
  league: string;
  club: string;
  avatarImage: string;
  avatarPosition: { x: number; y: number };
  avatarSize: { width: number; height: number }; // 头像尺寸
}

// Store 状态类型
interface CardStore {
  // 保存的卡片数据（持久化）
  savedCard: PlayerCardData;
  // 临时编辑的数据
  tempCard: PlayerCardData;
  // 更新临时数据
  updateTempCard: (data: Partial<PlayerCardData>) => void;
  // 保存到持久化存储
  saveCard: () => void;
  // 重置临时数据为保存的数据
  resetTempCard: () => void;
  // 更新头像位置（实时同步）
  updateAvatarPosition: (position: { x: number; y: number }) => void;
  // 更新头像图片（实时同步）
  updateAvatarImage: (image: string) => void;
  // 更新头像尺寸（实时同步）
  updateAvatarSize: (size: { width: number; height: number }) => void;
}

// 默认球员数据
const defaultPlayerData: PlayerCardData = {
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
  avatarImage: "/file.svg",
  avatarPosition: { x: 68, y: 60 },
  avatarSize: { width: 120, height: 120 }, // 默认尺寸
};

// 创建 store
export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      // 初始保存的数据
      savedCard: defaultPlayerData,
      // 初始临时数据（与保存数据相同）
      tempCard: defaultPlayerData,

      // 更新临时数据（实时同步到左侧卡片）
      updateTempCard: (data) =>
        set((state) => ({
          tempCard: { ...state.tempCard, ...data },
        })),

      // 保存数据到持久化存储
      saveCard: () =>
        set((state) => ({
          savedCard: { ...state.tempCard },
        })),

      // 重置临时数据
      resetTempCard: () =>
        set((state) => ({
          tempCard: { ...state.savedCard },
        })),

      // 更新头像位置（实时同步）
      updateAvatarPosition: (position) =>
        set((state) => ({
          tempCard: { ...state.tempCard, avatarPosition: position },
        })),

      // 更新头像图片（实时同步）
      updateAvatarImage: (image) =>
        set((state) => ({
          tempCard: { ...state.tempCard, avatarImage: image },
        })),

      // 更新头像尺寸（实时同步）
      updateAvatarSize: (size) =>
        set((state) => ({
          tempCard: { ...state.tempCard, avatarSize: size },
        })),
    }),
    {
      name: 'player-card-storage', // localStorage key
      // 只持久化保存的数据
      partialize: (state) => ({ savedCard: state.savedCard }),
      // 在恢复持久化状态后，将 savedCard 同步到 tempCard
      onRehydrateStorage: () => (state) => {
        if (state) {
          // 确保旧数据也有 avatarSize 字段
          if (!state.savedCard.avatarSize) {
            state.savedCard.avatarSize = { width: 120, height: 120 };
          }
          state.tempCard = { ...state.savedCard };
        }
      },
    }
  )
);
