// 模拟数据 - 实际使用时应从 API 获取
const newsData = [
    {
        category: '大模型',
        title: 'GPT-5 发布：多模态能力实现重大突破',
        excerpt: 'OpenAI 正式发布 GPT-5，在推理能力、多模态理解和代码生成方面实现质的飞跃，支持实时视频分析和复杂数学证明。',
        source: 'OpenAI Blog',
        time: '2 小时前',
        color: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
        category: '医疗 AI',
        title: 'AI 诊断系统准确率超越资深医生',
        excerpt: '最新研究表明，基于 Transformer 的医疗 AI 系统在多种疾病诊断上的准确率超过 95%，有望缓解医疗资源短缺问题。',
        source: 'Nature Medicine',
        time: '4 小时前',
        color: 'linear-gradient(135deg, #10b981, #06b6d4)'
    },
    {
        category: '机器人',
        title: '通用人形机器人成本降至 2 万美元',
        excerpt: '特斯拉 Optimus 新一代量产版本发布，通过垂直整合和规模化生产，成本大幅降低，预计 2027 年进入家庭。',
        source: 'Tesla AI Day',
        time: '6 小时前',
        color: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    },
    {
        category: 'AI 芯片',
        title: '英伟达发布新一代 B200 GPU',
        excerpt: 'B200 采用 3nm 工艺，算力提升 3 倍，功耗降低 40%，专为万亿参数大模型训练设计。',
        source: 'NVIDIA GTC',
        time: '8 小时前',
        color: 'linear-gradient(135deg, #7c3aed, #db2777)'
    },
    {
        category: '自然语言处理',
        title: '多语言翻译模型支持 200+ 语种',
        excerpt: 'Meta 发布 NLLB-200 升级版，实现低资源语言的高质量翻译，覆盖全球 98% 人口使用的语言。',
        source: 'Meta AI',
        time: '12 小时前',
        color: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
    },
    {
        category: '计算机视觉',
        title: '视频生成模型实现电影级质量',
        excerpt: 'Runway 发布 Gen-3，支持 4K 分辨率、60fps 视频生成，可精确控制镜头运动和角色动作。',
        source: 'Runway ML',
        time: '1 天前',
        color: 'linear-gradient(135deg, #ec4899, #8b5cf6)'
    }
];

const papersData = [
    {
        category: '强化学习',
        title: 'ACT: Action Quality Assessment via Reinforcement Learning',
        excerpt: '提出基于 RL 的 action 质量评估框架，自动判断 agent 行为的优劣，提升训练效率。',
        source: 'arXiv:2603.08706',
        time: '3 天前',
        color: 'linear-gradient(135deg, #6366f1, #3b82f6)'
    },
    {
        category: '脑机接口',
        title: 'Online Adaptive BCI Decoder with Contrastive Learning',
        excerpt: '结合对比学习和在线自适应的 BCI 解码器，显著提升跨会话稳定性和泛化能力。',
        source: 'NeurIPS 2026',
        time: '5 天前',
        color: 'linear-gradient(135deg, #10b981, #14b8a6)'
    },
    {
        category: '大模型',
        title: 'Efficient Attention Mechanisms for LLMs',
        excerpt: '新的注意力机制将大模型推理速度提升 5 倍，同时保持模型性能不变。',
        source: 'ICML 2026',
        time: '1 周前',
        color: 'linear-gradient(135deg, #f59e0b, #f97316)'
    }
];

const toolsData = [
    {
        category: '开发工具',
        title: 'Cursor Pro 2026',
        excerpt: 'AI 原生代码编辑器，支持全项目理解、自动重构和智能调试。',
        source: 'cursor.sh',
        time: '热门',
        color: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
    },
    {
        category: '数据科学',
        title: 'Julius AI',
        excerpt: 'AI 数据分析助手，支持自然语言查询、自动可视化和统计建模。',
        source: 'julius.ai',
        time: '热门',
        color: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
    },
    {
        category: '图像生成',
        title: 'Midjourney V7',
        excerpt: '全新图像生成模型，支持精确文本渲染和复杂场景理解。',
        source: 'midjourney.com',
        time: '热门',
        color: 'linear-gradient(135deg, #ec4899, #8b5cf6)'
    }
];

const trendingData = [
    'GPT-5 多模态能力详解',
    'BCI 技术最新突破',
    '人形机器人成本分析',
    'AI 医疗诊断伦理讨论',
    '开源大模型对比评测'
];

// 渲染新闻卡片
function renderNewsCards() {
    const newsGrid = document.getElementById('newsGrid');
    newsGrid.innerHTML = newsData.map(news => `
        <div class="news-card">
            <div class="news-image" style="background: ${news.color}"></div>
            <div class="news-content">
                <span class="news-category">${news.category}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-excerpt">${news.excerpt}</p>
                <div class="news-meta">
                    <div class="news-source">📰 ${news.source}</div>
                    <div class="news-time">⏰ ${news.time}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染论文卡片
function renderPapersCards() {
    const papersGrid = document.getElementById('papersGrid');
    papersGrid.innerHTML = papersData.map(paper => `
        <div class="news-card">
            <div class="news-image" style="background: ${paper.color}"></div>
            <div class="news-content">
                <span class="news-category">${paper.category}</span>
                <h3 class="news-title">${paper.title}</h3>
                <p class="news-excerpt">${paper.excerpt}</p>
                <div class="news-meta">
                    <div class="news-source">📄 ${paper.source}</div>
                    <div class="news-time">⏰ ${paper.time}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染工具卡片
function renderToolsCards() {
    const toolsGrid = document.getElementById('toolsGrid');
    toolsGrid.innerHTML = toolsData.map(tool => `
        <div class="news-card">
            <div class="news-image" style="background: ${tool.color}"></div>
            <div class="news-content">
                <span class="news-category">${tool.category}</span>
                <h3 class="news-title">${tool.title}</h3>
                <p class="news-excerpt">${tool.excerpt}</p>
                <div class="news-meta">
                    <div class="news-source">🔗 ${tool.source}</div>
                    <div class="news-time">⭐ ${tool.time}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染热点列表
function renderTrending() {
    const trendingList = document.getElementById('trendingList');
    trendingList.innerHTML = trendingData.map((item, index) => `
        <div class="trending-item">
            <div class="trending-number">${index + 1}</div>
            <div class="trending-title">${item}</div>
        </div>
    `).join('');
}

// 刷新内容
function refreshContent() {
    const btn = document.querySelector('.refresh-btn');
    btn.classList.add('spinning');
    
    setTimeout(() => {
        btn.classList.remove('spinning');
        
        // 模拟刷新
        renderNewsCards();
        renderPapersCards();
        renderToolsCards();
        renderTrending();
        
        // 显示提示
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            background: var(--success);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 1001;
            animation: fadeIn 0.3s;
        `;
        toast.textContent = '✅ 内容已更新';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }, 1000);
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 分类筛选
document.querySelectorAll('.category-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        document.querySelectorAll('.category-tag').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        // 实际应用中这里应该过滤内容
    });
});

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    renderNewsCards();
    renderPapersCards();
    renderToolsCards();
    renderTrending();
});

// 自动刷新 (每 30 分钟)
setInterval(refreshContent, 30 * 60 * 1000);
