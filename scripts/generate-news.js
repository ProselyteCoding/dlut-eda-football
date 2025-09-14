#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// 获取所有新闻文件
function getAllNewsFiles() {
  const newsDir = path.join(__dirname, '..', 'src', 'content', 'news');
  
  if (!fs.existsSync(newsDir)) {
    console.log('❌ 新闻目录不存在');
    return [];
  }

  const files = fs.readdirSync(newsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(newsDir, file));

  return files;
}

// 解析新闻文件
function parseNewsFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    const slug = path.basename(filePath, '.md');
    
    return {
      slug,
      title: data.title || '未命名新闻',
      publishDate: data.publishDate || '未知日期',
      author: data.author || '未知作者',
      tags: data.tags || [],
      coverImage: data.coverImage || `/news-assets/${slug}/cover.jpg`
    };
  } catch (error) {
    console.error(`❌ 解析文件失败 ${filePath}:`, error.message);
    return null;
  }
}

// 更新lib/news.ts中的fallback数据
function updateFallbackNews(newsArray) {
  try {
    const newsLibPath = path.join(__dirname, '..', 'src', 'lib', 'news.ts');
    
    if (!fs.existsSync(newsLibPath)) {
      console.log('❌ news.ts文件不存在');
      return false;
    }
    
    let content = fs.readFileSync(newsLibPath, 'utf8');
    
    // 生成新的fallback新闻数据
    const newsItems = newsArray.map(news => {
      const contentPlaceholder = `\`# ${news.title}

## 新闻内容

这里是新闻的详细内容...\``;

      return `    {
      slug: '${news.slug}',
      title: '${news.title}',
      content: ${contentPlaceholder},
      publishDate: '${news.publishDate}',
      author: '${news.author}',
      tags: [${news.tags.map(tag => `'${tag}'`).join(', ')}],
      coverImage: '${news.coverImage}'
    }`;
    }).join(',\n');

    // 替换fallback数据
    const fallbackPattern = /(function getFallbackNews\(\): NewsArticle\[\] \{\s+return \[)([\s\S]*?)(\s+\];\s+\})/;
    const replacement = `$1\n${newsItems}\n$3`;
    
    content = content.replace(fallbackPattern, replacement);
    
    fs.writeFileSync(newsLibPath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('❌ 更新fallback数据失败:', error.message);
    return false;
  }
}

// 检查是否安装了gray-matter
function checkDependencies() {
  try {
    require.resolve('gray-matter');
    return true;
  } catch (error) {
    console.log('❌ 缺少依赖包 gray-matter');
    console.log('📦 请运行: npm install gray-matter');
    return false;
  }
}

// 主函数
async function main() {
  console.log('🚀 大连理工大学足球社新闻应用工具');
  console.log('=====================================');
  console.log('🎯 步骤2: 应用新闻文件到页面\n');
  
  // 检查依赖
  if (!checkDependencies()) {
    process.exit(1);
  }
  
  try {
    // 获取所有新闻文件
    const newsFiles = getAllNewsFiles();
    
    if (newsFiles.length === 0) {
      console.log('📝 没有找到新闻文件');
      console.log('💡 请先运行: npm run add-news');
      return;
    }
    
    console.log(`📁 找到 ${newsFiles.length} 个新闻文件`);
    
    // 解析所有新闻文件
    const newsArray = [];
    for (const file of newsFiles) {
      const news = parseNewsFile(file);
      if (news) {
        newsArray.push(news);
        console.log(`✅ 解析成功: ${news.title}`);
      }
    }
    
    if (newsArray.length === 0) {
      console.log('❌ 没有有效的新闻文件');
      return;
    }
    
    // 按日期排序（最新的在前）
    newsArray.sort((a, b) => new Date(b.publishDate.replace(/年|月/g, '-').replace(/日/g, '')) - new Date(a.publishDate.replace(/年|月/g, '-').replace(/日/g, '')));
    
    // 更新fallback数据
    if (updateFallbackNews(newsArray)) {
      console.log('\n🎉 新闻应用完成！');
      console.log(`📊 已应用 ${newsArray.length} 条新闻到页面`);
      console.log('\n📋 下一步操作:');
      console.log('1. 🌐 重启开发服务器: npm run dev');
      console.log('2. 🖥️  打开浏览器查看效果');
      console.log('3. 📱 检查新闻页面和详情页');
      console.log('\n💡 提示: 新闻已按发布日期排序显示');
    } else {
      console.log('❌ 应用新闻失败');
    }
    
  } catch (error) {
    console.error('❌ 应用新闻失败:', error.message);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = { getAllNewsFiles, parseNewsFile, updateFallbackNews };
