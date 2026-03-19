# AI 前沿 - 全球人工智能资讯聚合平台

🧠 一个**真实可用**的现代化 AI 资讯网站，自动聚合全球最新人工智能技术动态。

## ✨ 核心功能

| 模块 | 数据来源 | 更新频率 | 可点击 |
|------|----------|----------|--------|
| 📰 **科技资讯** | Hacker News API | 实时 | ✅ |
| 📄 **热门论文** | arXiv API | 每日 | ✅ |
| 🧠 **BCI 专栏** | arXiv (BCI 相关) | 每周 | ✅ |
| 🛠️ **AI 工具** | 精选工具库 | 每周 | ✅ |
| 💻 **开源项目** | GitHub Trending | 每日 | ✅ |

## 🚀 本地预览

```bash
cd projects/zhangziyue-website
python -m http.server 8080
```

访问：http://localhost:8080

## 📡 数据源说明

### 1. 科技资讯 - Hacker News
- 实时获取 Hacker News 热门科技新闻
- 自动分类：大模型、AI 芯片、机器人等
- 点击跳转至原始链接

### 2. 学术论文 - arXiv API
- 自动抓取 cs.AI (人工智能) 分类最新论文
- 支持 BCI 专属查询 (brain-computer interface, EEG 等)
- 点击跳转至 arXiv 详情页

### 3. AI 工具 - 精选库
- Cursor、Julius AI、Midjourney 等热门工具
- 分类：开发工具、数据科学、图像生成等
- 点击直达工具官网

### 4. 开源项目 - GitHub
- GitHub Trending AI 相关项目
- 显示 Star 数和编程语言
- 点击跳转至 GitHub 仓库

### 5. BCI 专栏 - 特色模块
- 专注脑机接口领域研究
- 关键词：BCI、EEG、neural decoding 等
- 为紫钺的 BCI 工作提供最新文献支持

## 🎨 设计特点

- **暗色主题** - 科技感十足的渐变配色
- **响应式** - 完美适配手机/平板/桌面
- **真实链接** - 所有卡片均可点击跳转
- **自动刷新** - 30 分钟自动更新内容
- **加载状态** - 优雅的数据加载提示

## 🛠️ 技术栈

- 纯 HTML/CSS/JavaScript (无框架依赖)
- arXiv API (论文数据)
- Hacker News Firebase API (新闻数据)
- GitHub API (开源项目)
- CSS 变量主题系统

## 📁 项目结构

```
zhangziyue-website/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 数据获取 + 渲染逻辑
├── README.md           # 项目说明
└── *.bak               # 原始 BCI 官网备份
```

## 🔌 扩展建议

### 添加更多数据源

```javascript
// 示例：添加 Hugging Face 模型
async function fetchHuggingFaceModels() {
    const response = await fetch('https://huggingface.co/api/models?sort=trending');
    return await response.json();
}
```

### 添加搜索功能

```javascript
function handleSearch() {
    const query = document.getElementById('searchInput').value;
    // 实现跨模块搜索
}
```

### 添加分类过滤

```javascript
function filterByCategory(category) {
    // 过滤显示指定类别的内容
}
```

## 🌐 部署

### GitHub Pages

```bash
git add .
git commit -m "Update: 真实数据源 + BCI 专栏"
git push origin main
```

访问：https://zzy1233211.github.io/website

## 📊 性能优化

- ✅ 并行数据获取 (`Promise.all`)
- ✅ 备用数据 (API 失败时降级)
- ✅ 懒加载 (按需获取数据)
- ✅ 缓存策略 (可减少 API 调用)

## 🧠 BCI 专栏特色

为紫钺的脑机接口工作特别设计:
- 自动追踪 arXiv 最新 BCI 论文
- 涵盖：运动想象、SSVEP、P300、神经反馈等方向
- 支持在线自适应、对比学习、黎曼几何等关键词

## 📄 许可证

MIT License

## 👨‍💻 作者

由 **小智 (Xiao Zhi)** 🧠 为 **紫钺** 设计开发

---

**AI 前沿** - 探索人工智能的无限可能 🚀  
**BCI 专栏** - 专注脑机接口前沿研究 🧠
