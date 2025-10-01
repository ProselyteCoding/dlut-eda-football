// IndexedDB 工具函数 - 用于缓存大型静态资源（图片、视频）

const DB_NAME = 'DlutFootballDB';
const DB_VERSION = 1;
const STORE_NAME = 'avatars';

// 打开数据库
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // 创建对象存储空间
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// 存储图片到 IndexedDB
export async function saveAvatarToIndexedDB(file: File): Promise<string> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // 使用固定 ID 'player-avatar'，每次覆盖
    const id = 'player-avatar';
    
    // 存储完整的 File 对象
    const data = {
      id,
      file,
      timestamp: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(data);
      
      request.onsuccess = () => {
        // 创建 ObjectURL 用于显示
        const objectURL = URL.createObjectURL(file);
        resolve(objectURL);
      };
      
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('保存图片到 IndexedDB 失败:', error);
    throw error;
  }
}

// 从 IndexedDB 读取图片
export async function getAvatarFromIndexedDB(): Promise<string | null> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const id = 'player-avatar';

    return new Promise((resolve, reject) => {
      const request = store.get(id);
      
      request.onsuccess = () => {
        const result = request.result;
        if (result && result.file) {
          // 创建 ObjectURL
          const objectURL = URL.createObjectURL(result.file);
          resolve(objectURL);
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('从 IndexedDB 读取图片失败:', error);
    return null;
  }
}

// 删除图片
export async function deleteAvatarFromIndexedDB(): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const id = 'player-avatar';

    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('从 IndexedDB 删除图片失败:', error);
    throw error;
  }
}

// 清理 ObjectURL（在组件卸载时调用）
export function revokeObjectURL(url: string) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}
