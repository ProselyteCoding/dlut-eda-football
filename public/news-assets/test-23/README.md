# test-23 新闻资源文件夹

此文件夹用于存放新闻相关的图片和视频资源。

## 文件命名建议

- `cover.jpg` - 新闻封面图片（必需）
- `image1.jpg`, `image2.jpg` - 内容图片
- `video1.mp4`, `video2.mp4` - 视频文件

## 使用方法

在Markdown文件中引用资源:
```markdown
![图片描述](/news-assets/test-23/image1.jpg)
<video src="/news-assets/test-23/video1.mp4" controls></video>
```

## 注意事项

- 图片建议使用JPG或PNG格式
- 视频建议使用MP4格式
- 文件大小请控制在合理范围内
- 文件名请使用英文，避免特殊字符
