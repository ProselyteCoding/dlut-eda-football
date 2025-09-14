#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 封装question为Promise
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// 验证路由名格式
function validateSlug(slug) {
  // 检查是否只包含英文字母、数字和连字符，且不以连字符开头或结尾
  const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}

// 获取当前日期
function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

// 创建资源文件夹
function createAssetFolder(slug) {
  const assetPath = path.join(__dirname, '..', 'public', 'news-assets', slug);
  
  if (!fs.existsSync(assetPath)) {
    fs.mkdirSync(assetPath, { recursive: true });
    
    // 创建README文件说明资源文件夹用途
    const readmeContent = `# ${slug} 新闻资源文件夹

此文件夹用于存放新闻相关的图片和视频资源。

## 文件命名建议

- \`cover.jpg\` - 新闻封面图片（必需）
- \`image1.jpg\`, \`image2.jpg\` - 内容图片
- \`video1.mp4\`, \`video2.mp4\` - 视频文件

## 使用方法

在Markdown文件中引用资源:
\`\`\`markdown
![图片描述](/news-assets/${slug}/image1.jpg)
<video src="/news-assets/${slug}/video1.mp4" controls></video>
\`\`\`

## 注意事项

- 图片建议使用JPG或PNG格式
- 视频建议使用MP4格式
- 文件大小请控制在合理范围内
- 文件名请使用英文，避免特殊字符
`;
    
    fs.writeFileSync(path.join(assetPath, 'README.md'), readmeContent, 'utf8');
    console.log(`📁 已创建资源文件夹: public/news-assets/${slug}/`);
  }
}

// 生成markdown模板内容
function generateMarkdownTemplate(newsData) {
  const { title, author, tags, slug } = newsData;
  
  return `---
title: "${title}"
publishDate: "${getCurrentDate()}"
author: "${author}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
coverImage: "/news-assets/${slug}/cover.jpg"
---

# ${title}

> 📝 **编辑提示**: 请在此处编写新闻内容
> 
> 💡 **使用指南**: 
> - 支持Markdown语法格式化文本
> - 可以添加图片、链接等元素
> - 图片和视频资源请放在: \`public/news-assets/${slug}/\` 文件夹中
> - 封面图片请命名为: \`cover.jpg\` 并放在资源文件夹中
> - 编辑完成后运行 \`npm run generate-news\` 应用到页面

## 新闻概要

在这里写一段简短的新闻概要...

## 详细内容

在这里添加详细的新闻内容...

![示例图片](/news-assets/${slug}/example-image.jpg)

### 相关信息

- **时间**: 请填写具体时间
- **地点**: 请填写具体地点
- **联系方式**: 请填写联系信息

## 总结

在这里写新闻总结...

---

*本文由 ${author} 编辑*

## 📂 资源文件说明

本新闻的图片和视频资源存放在: \`public/news-assets/${slug}/\`

建议的文件结构:
- \`cover.jpg\` - 封面图片（必需）
- \`image1.jpg\` - 内容图片1
- \`image2.jpg\` - 内容图片2
- \`video1.mp4\` - 视频文件1
`;
}

// 主函数
async function main() {
  console.log('📝 大连理工大学足球社新闻创建工具');
  console.log('=====================================');
  console.log('🎯 创建新闻模板文件和资源文件夹\n');
  
  try {
    // 收集路由名称（英文）
    let slug = '';
    while (true) {
      slug = await question('🔗 请输入路由名称 (英文，用连字符分隔，如: spring-football-match): ');
      
      if (!slug.trim()) {
        console.log('❌ 路由名称不能为空');
        continue;
      }
      
      if (!validateSlug(slug.trim())) {
        console.log('❌ 路由名称格式不正确！');
        console.log('   💡 请使用英文字母、数字和连字符，例如: spring-football-match');
        console.log('   💡 不能以连字符开头或结尾');
        continue;
      }
      
      // 检查文件是否已存在
      const filename = `${slug.trim()}.md`;
      const filePath = path.join(__dirname, '..', 'src', 'content', 'news', filename);
      
      if (fs.existsSync(filePath)) {
        console.log(`❌ 路由名称 "${slug.trim()}" 已存在，请使用其他名称`);
        continue;
      }
      
      slug = slug.trim();
      break;
    }

    // 收集新闻标题（中文）
    const title = await question('📰 请输入新闻标题 (中文): ');
    if (!title.trim()) {
      console.log('❌ 标题不能为空');
      process.exit(1);
    }

    // 收集作者信息
    const author = await question('👤 请输入作者姓名: ');
    if (!author.trim()) {
      console.log('❌ 作者不能为空');
      process.exit(1);
    }

    // 收集标签信息
    const tagsInput = await question('🏷️  请输入标签 (用空格分隔): ');
    const tags = tagsInput.split(' ').filter(tag => tag.trim()).map(tag => tag.trim());

    const filename = `${slug}.md`;
    const filePath = path.join(__dirname, '..', 'src', 'content', 'news', filename);

    // 确保目录存在
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 准备新闻数据
    const newsData = {
      title: title.trim(),
      author: author.trim(),
      tags,
      slug
    };

    // 创建资源文件夹
    createAssetFolder(slug);

    // 生成markdown内容
    const markdownContent = generateMarkdownTemplate(newsData);

    // 写入文件
    fs.writeFileSync(filePath, markdownContent, 'utf8');
    console.log(`✅ 新闻模板文件已创建: ${filename}`);
    
    console.log('\n🎉 新闻模板和资源文件夹创建完成！');
    console.log(`📂 Markdown文件: src/content/news/${filename}`);
    console.log(`📁 资源文件夹: public/news-assets/${slug}/`);
    console.log(`🔗 访问链接: /news/${slug}`);
    console.log('\n📋 下一步操作:');
    console.log(`1. 📝 编辑文件: src/content/news/${filename}`);
    console.log(`2. 🖼️  添加封面图片: public/news-assets/${slug}/cover.jpg`);
    console.log(`3. 📷 添加其他图片和视频到资源文件夹`);
    console.log('4. ✏️  编辑新闻内容，引用资源文件');
    console.log('5. 💾 保存文件');
    console.log('6. 🚀 运行: npm run generate-news');
    console.log('7. 🌐 重启开发服务器: npm run dev');
    console.log('\n💡 提示: 请确保添加封面图片，否则新闻卡片可能显示异常');
    
  } catch (error) {
    console.error('❌ 创建新闻失败:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = { generateMarkdownTemplate, getCurrentDate, createAssetFolder };
