// 服务器端新闻容器组件
import { getAllNews } from '@/lib/news';
import News from './News';

export default function NewsContainer() {
  // 在服务器端获取新闻数据
  const allNews = getAllNews();
  
  return <News newsData={allNews} />;
}