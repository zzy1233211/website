# AI 前沿 - 全球人工智能资讯聚合平台

🧠 一个现代化的 AI 资讯网站，汇聚全球最新人工智能技术动态、前沿论文和创新工具。

## ✨ 特性

- 🎨 **现代化暗色主题** - 科技感十足的渐变配色
- 📰 **最新资讯** - 实时聚合全球 AI 新闻
- 📄 **论文追踪** - arXiv、NeurIPS 等顶会最新研究
- 🛠️ **工具推荐** - 精选 AI 开发工具和应用
- 🔍 **智能搜索** - 快速定位感兴趣的内容
- 📱 **全端适配** - 完美支持桌面和移动设备
- 🔄 **自动刷新** - 定期更新最新资讯

## 🚀 快速开始

### 本地预览

```bash
# 使用 Python 内置服务器
cd projects/zhangziyue-website
python -m http.server 8080

# 或使用 Node.js
npx serve
```

然后在浏览器访问 `http://localhost:8080`

### 部署到 GitHub Pages

1. 提交更改
```bash
git add .
git commit -m "Redesign: AI 资讯网站 - 现代化暗色主题"
git push origin main
```

2. 在 GitHub 仓库设置中启用 GitHub Pages
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main / root

网站将自动部署到 `https://你的用户名.github.io/仓库名`

## 📁 项目结构

```
zhangziyue-website/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 交互逻辑
├── README.md           # 项目说明
└── *.bak               # 备份文件 (原始 BCI 官网)
```

## 🎨 自定义

### 修改配色方案

在 `style.css` 的 `:root` 部分修改 CSS 变量:

```css
:root {
    --primary: #6366f1;      /* 主色调 */
    --secondary: #8b5cf6;    /* 辅助色 */
    --accent: #06b6d4;       /* 强调色 */
    --bg-dark: #0f172a;      /* 背景深色 */
    --bg-card: #1e293b;      /* 卡片背景 */
}
```

### 添加真实数据

修改 `script.js` 中的数据源，或连接真实 API:

```javascript
// 示例：从 API 获取数据
async function fetchNews() {
    const response = await fetch('https://api.example.com/ai-news');
    const data = await response.json();
    return data;
}
```

## 🔌 推荐 API 集成

- **arXiv API** - 最新论文
- **Hugging Face API** - AI 模型和工具
- **GitHub API** - 开源项目趋势
- **NewsAPI** - 科技新闻
- **Reddit API** - r/MachineLearning 热点

## 📊 性能优化

- ✅ 纯静态页面，加载速度快
- ✅ 无外部依赖，无需构建
- ✅ CSS 变量主题系统
- ✅ 响应式设计，移动端友好

## 🛣️ 后续改进

- [ ] 连接真实 API 获取实时数据
- [ ] 添加用户登录和收藏功能
- [ ] 实现 RSS 订阅
- [ ] 添加夜间/日间模式切换
- [ ] 支持多语言
- [ ] 添加评论和分享功能

## 📄 许可证

MIT License

## 👨‍💻 作者

由 **小智 (Xiao Zhi)** 🧠 为 **紫钺** 设计开发

---

**AI 前沿** - 探索人工智能的无限可能 🚀
