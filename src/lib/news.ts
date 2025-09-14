import fs from 'fs';
import path from 'path';

export interface NewsArticle {
  slug: string;
  title: string;
  content: string;
  publishDate?: string;
  author?: string;
  tags?: string[];
  coverImage?: string;
  metadata?: {
    [key: string]: any;
  };
}

const newsDirectory = path.join(process.cwd(), 'src/content/news');

export function getAllNews(): NewsArticle[] {
  try {
    // 检查新闻目录是否存在
    if (!fs.existsSync(newsDirectory)) {
      console.warn('News directory does not exist, returning fallback data');
      return getFallbackNews();
    }

    const fileNames = fs.readdirSync(newsDirectory);
    const allNews = fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const slug = name.replace(/\.md$/, '');
        const fullPath = path.join(newsDirectory, name);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // 解析markdown内容
        const { title, content, metadata } = parseMarkdown(fileContents);
        
        return {
          slug,
          title,
          content,
          publishDate: metadata.publishDate,
          author: metadata.author,
          tags: metadata.tags,
          coverImage: metadata.coverImage,
          metadata
        };
      });

    // 如果没有新闻文件，返回fallback数据
    if (allNews.length === 0) {
      return getFallbackNews();
    }

    // 按日期排序（最新的在前）
    return allNews.sort((a, b) => {
      if (a.publishDate && b.publishDate) {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      }
      return 0;
    });
  } catch (error) {
    console.error('Error reading news directory:', error);
    return getFallbackNews();
  }
}

// Fallback新闻数据
function getFallbackNews(): NewsArticle[] {
  return [
    {
      slug: 'orange-cup-2024-review',
      title: '2024年橙锋杯足球赛精彩回顾',
      content: `# 2024年橙锋杯足球赛精彩回顾

## 新闻内容

这里是新闻的详细内容...`,
      publishDate: '2024年12月25日',
      author: '足球社新闻部',
      tags: ['橙锋杯', '比赛回顾', '精彩瞬间'],
      coverImage: '/news-assets/orange-cup-2024-review/cover.jpg'
    },
    {
      slug: 'spring-recruitment-2025',
      title: '足球社2025年春季招新活动启动',
      content: `# 足球社2025年春季招新活动启动

## 新闻内容

这里是新闻的详细内容...`,
      publishDate: '2024年12月22日',
      author: '足球社宣传部',
      tags: ['招新', '春季学期', '新成员'],
      coverImage: '/news-assets/spring-recruitment-2025/cover.jpg'
    },
    {
      slug: 'dut-cup-championship-report',
      title: '大工杯足球锦标赛战报',
      content: `# 大工杯足球锦标赛战报

## 新闻内容

这里是新闻的详细内容...`,
      publishDate: '2024年12月18日',
      author: '体育部记者',
      tags: ['大工杯', '锦标赛', '战报'],
      coverImage: '/news-assets/dut-cup-championship-report/cover.jpg'
    },
    {
      slug: 'winter-camp-opening',
      title: '足球训练营Winter Camp开营啦',
      content: `# 足球训练营Winter Camp开营啦

## 新闻内容

这里是新闻的详细内容...`,
      publishDate: '2024年12月15日',
      author: '训练部',
      tags: ['训练营', '冬令营', '技能提升'],
      coverImage: '/news-assets/winter-camp-opening/cover.jpg'
    },
    {
      slug: 'football-culture-festival',
      title: '校园足球文化节成功举办',
      content: `# 校园足球文化节成功举办

## 新闻内容

这里是新闻的详细内容...`,
      publishDate: '2024年12月10日',
      author: '文化部',
      tags: ['文化节', '校园活动', '足球文化'],
      coverImage: '/news-assets/football-culture-festival/cover.jpg'
    }





  ];
}

export function getNewsBySlug(slug: string): NewsArticle | null {
  try {
    const fullPath = path.join(newsDirectory, `${slug}.md`);
    
    // 如果文件存在，尝试读取
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { title, content, metadata } = parseMarkdown(fileContents);
      
      return {
        slug,
        title,
        content,
        publishDate: metadata.publishDate,
        author: metadata.author,
        tags: metadata.tags,
        coverImage: metadata.coverImage,
        metadata
      };
    }
    
    // 如果文件不存在，从fallback数据中查找
    const fallbackNews = getFallbackNews();
    const article = fallbackNews.find(news => news.slug === slug);
    return article || null;
    
  } catch (error) {
    console.error(`Error reading news file for slug ${slug}:`, error);
    
    // 尝试从fallback数据中查找
    const fallbackNews = getFallbackNews();
    const article = fallbackNews.find(news => news.slug === slug);
    return article || null;
  }
}

function parseMarkdown(content: string): {
  title: string;
  content: string;
  metadata: {
    publishDate?: string;
    author?: string;
    tags?: string[];
    coverImage?: string;
  };
} {
  // 统一换行符为 \n
  const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalizedContent.split('\n');
  
  // 检查是否有YAML front matter
  if (lines[0] === '---') {
    const endIndex = lines.findIndex((line, index) => index > 0 && line === '---');
    if (endIndex > 0) {
      // 解析YAML front matter
      const frontMatterLines = lines.slice(1, endIndex);
      const metadata: any = {};
      
      frontMatterLines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && trimmedLine.includes(':')) {
          const colonIndex = trimmedLine.indexOf(':');
          const key = trimmedLine.substring(0, colonIndex).trim();
          const value = trimmedLine.substring(colonIndex + 1).trim();
          
          if (key === 'title') {
            metadata.title = value.replace(/^["']|["']$/g, '');
          } else if (key === 'publishDate') {
            metadata.publishDate = value.replace(/^["']|["']$/g, '');
          } else if (key === 'author') {
            metadata.author = value.replace(/^["']|["']$/g, '');
          } else if (key === 'coverImage') {
            metadata.coverImage = value.replace(/^["']|["']$/g, '');
          } else if (key === 'tags') {
            // 解析数组格式 ["tag1", "tag2", "tag3"]
            const tagsMatch = value.match(/\[(.*)\]/);
            if (tagsMatch) {
              const tagsStr = tagsMatch[1];
              metadata.tags = tagsStr.split(',').map(tag => 
                tag.trim().replace(/^["']|["']$/g, '')
              ).filter(tag => tag.length > 0);
            }
          }
        }
      });
      
      // 获取内容部分，跳过front matter
      const contentLines = lines.slice(endIndex + 1);
      const title = metadata.title || contentLines.find(line => line.startsWith('# '))?.replace(/^# /, '') || 'Untitled';
      const contentBody = contentLines.join('\n').trim();
      
      return {
        title,
        content: contentBody,
        metadata
      };
    }
  }
  
  // fallback: 如果没有YAML front matter
  const firstLine = lines.find(line => line.trim().startsWith('# '));
  const title = firstLine ? firstLine.replace(/^# /, '').trim() : 'Untitled';
  const metadata: any = {};
  
  return {
    title,
    content: normalizedContent.trim(),
    metadata
  };
}

export function getNewsSlugList(): string[] {
  try {
    // 尝试从文件系统读取
    if (fs.existsSync(newsDirectory)) {
      const fileNames = fs.readdirSync(newsDirectory);
      const slugs = fileNames
        .filter(name => name.endsWith('.md'))
        .map(name => name.replace(/\.md$/, ''));
      
      if (slugs.length > 0) {
        return slugs;
      }
    }
    
    // 如果没有文件，返回fallback数据的slugs
    const fallbackNews = getFallbackNews();
    return fallbackNews.map(news => news.slug);
    
  } catch (error) {
    console.error('Error reading news directory for slug list:', error);
    
    // 返回fallback数据的slugs
    const fallbackNews = getFallbackNews();
    return fallbackNews.map(news => news.slug);
  }
}
