// 视频缓存工具函数 - IndexedDB

const DB_NAME = 'DlutFootballVideoDB';
const DB_VERSION = 1;
const STORE_NAME = 'videos';
const VIDEO_KEY = 'hero-video';

// 打开数据库
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// 从 IndexedDB 获取视频 Blob
export async function getVideoFromCache(): Promise<string | null> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(VIDEO_KEY);
      
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.blob) {
          // 创建 ObjectURL
          const objectURL = URL.createObjectURL(result.blob);
          resolve(objectURL);
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('从缓存获取视频失败:', error);
    return null;
  }
}

// 保存视频到 IndexedDB
export async function saveVideoToCache(videoUrl: string): Promise<void> {
  try {
    // 下载视频文件
    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error(`下载视频失败: ${response.status}`);
    }

    const blob = await response.blob();
    
    // 保存到 IndexedDB
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const data = {
      id: VIDEO_KEY,
      blob,
      timestamp: Date.now(),
      url: videoUrl,
    };

    return new Promise((resolve, reject) => {
      const request = store.put(data);
      
      request.onsuccess = () => {
        console.log('视频已缓存到 IndexedDB');
        resolve();
      };
      
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('保存视频到缓存失败:', error);
    throw error;
  }
}

// 检查视频是否已缓存
export async function isVideoCached(): Promise<boolean> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve) => {
      const request = store.get(VIDEO_KEY);
      
      request.onsuccess = () => {
        resolve(!!request.result);
      };
      
      request.onerror = () => resolve(false);
    });
  } catch (error) {
    console.error('检查视频缓存失败:', error);
    return false;
  }
}

// 清理 ObjectURL
export function revokeVideoURL(url: string) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}
