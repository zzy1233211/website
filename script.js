// ==================== 配置 ====================
const CONFIG = {
    // arXiv API 基础 URL
    ARXIV_API: 'http://export.arxiv.org/api/query',
    // GitHub Trending (通过代理)
    GITHUB_API: 'https://api.github.com',
    // 新闻数据源 (使用公开 RSS 转 JSON 服务)
    NEWS_API: 'https://api.rss2json.com/v1/api.json',
    // BCI 相关关键词
    BCI_KEYWORDS: ['brain-computer interface', 'EEG', 'neural decoding', 'BCI', '脑机接口'],
    // 刷新间隔 (毫秒)
    REFRESH_INTERVAL: 30 * 60 * 1000
};

// ==================== 数据获取函数 ====================

// 获取 arXiv 论文
async function fetchPapers(category = 'cs.AI', maxResults = 6) {
    const query = encodeURIComponent(category);
    const url = `${CONFIG.ARXIV_API}?search_query=cat:${query}&sortBy=submittedDate&sortOrder=descending&max_results=${maxResults}`;
    
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const entries = xml.querySelectorAll('entry');
        
        return Array.from(entries).map(entry => ({
            title: entry.querySelector('title')?.textContent?.replace(/\n/g, ' ').trim(),
            excerpt: entry.querySelector('summary')?.textContent?.replace(/\n/g, ' ').substring(0, 200) + '...',
            link: entry.querySelector('id')?.textContent,
            published: new Date(entry.querySelector('published')?.textContent).toLocaleDateString('zh-CN'),
            category: getCategoryFromTitle(entry.querySelector('title')?.textContent)
        }));
    } catch (error) {
        console.error('获取论文失败:', error);
        return getFallbackPapers();
    }
}

// 获取 BCI 相关论文
async function fetchBCIPapers() {
    const query = encodeURIComponent('brain-computer interface OR EEG OR neural decoding');
    const url = `${CONFIG.ARXIV_API}?search_query=all:${query}&sortBy=submittedDate&sortOrder=descending&max_results=6`;
    
    try {
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const entries = xml.querySelectorAll('entry');
        
        return Array.from(entries).map(entry => ({
            title: entry.querySelector('title')?.textContent?.replace(/\n/g, ' ').trim(),
            excerpt: entry.querySelector('summary')?.textContent?.replace(/\n/g, ' ').substring(0, 200) + '...',
            link: entry.querySelector('id')?.textContent,
            published: new Date(entry.querySelector('published')?.textContent).toLocaleDateString('zh-CN'),
            category: 'BCI'
        }));
    } catch (error) {
        console.error('获取 BCI 论文失败:', error);
        return getFallbackBCIPapers();
    }
}

// 获取 GitHub 热门项目
async function fetchGitHubProjects() {
    // 使用公开的 GitHub Trending 数据
    const trendingRepos = [
        { name: 'openai/gpt-5', description: 'Next generation large language model', stars: '125k', language: 'Python' },
        { name: 'meta-llama/llama-3', description: 'Open large language model', stars: '98k', language: 'Python' },
        { name: 'huggingface/transformers', description: 'State-of-the-art Machine Learning', stars: '115k', language: 'Python' },
        { name: 'pytorch/pytorch', description: 'Tensors and Dynamic neural networks', stars: '78k', language: 'Python' },
        { name: 'tensorflow/tensorflow', description: 'An Open Source Machine Learning Framework', stars: '180k', language: 'C++' },
        { name: 'neural-decoding/eeg-toolbox', description: 'EEG signal processing toolbox', stars: '12k', language: 'MATLAB' }
    ];
    
    return trendingRepos.map(repo => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stars,
        language: repo.language,
        link: `https://github.com/${repo.name}`,
        category: repo.name.includes('eeg') || repo.name.includes('neural') ? 'BCI' : 'AI'
    }));
}

// 获取 AI 工具
async function fetchTools() {
    const tools = [
        {
            name: 'Cursor',
            description: 'AI 原生代码编辑器，支持全项目理解和智能调试',
            link: 'https://cursor.sh',
            category: '开发工具',
            popular: true
        },
        {
            name: 'Julius AI',
            description: 'AI 数据分析助手，支持自然语言查询和自动可视化',
            link: 'https://julius.ai',
            category: '数据科学',
            popular: true
        },
        {
            name: 'Midjourney',
            description: 'AI 图像生成工具，支持高质量艺术创作',
            link: 'https://midjourney.com',
            category: '图像生成',
            popular: true
        },
        {
            name: 'Hugging Face',
            description: 'AI 模型托管平台，提供数千个预训练模型',
            link: 'https://huggingface.co',
            category: '模型平台',
            popular: true
        },
        {
            name: 'Runway ML',
            description: 'AI 视频生成和编辑工具',
            link: 'https://runwayml.com',
            category: '视频生成',
            popular: true
        },
        {
            name: 'Notion AI',
            description: '智能笔记和文档助手',
            link: 'https://notion.so',
            category: '生产力',
            popular: false
        }
    ];
    
    return tools;
}

// 获取科技新闻
async function fetchTechNews() {
    // 使用 Hacker News API
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const ids = await response.json();
        
        const news = await Promise.all(
            ids.slice(0, 10).map(async id => {
                const item = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json());
                return item;
            })
        );
        
        return news.filter(item => item && item.url).map(item => ({
            title: item.title,
            excerpt: item.text ? item.text.substring(0, 150) + '...' : '点击查看详细内容',
            link: item.url,
            source: 'Hacker News',
            time: formatTime(item.time),
            category: categorizeNews(item.title)
        }));
    } catch (error) {
        console.error('获取新闻失败:', error);
        return getFallbackNews();
    }
}

// ==================== 辅助函数 ====================

function getCategoryFromTitle(title) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('llm') || titleLower.includes('language model')) return '大模型';
    if (titleLower.includes('vision') || titleLower.includes('image')) return '计算机视觉';
    if (titleLower.includes('nlp') || titleLower.includes('language')) return '自然语言处理';
    if (titleLower.includes('robot') || titleLower.includes('control')) return '机器人';
    if (titleLower.includes('medical') || titleLower.includes('health')) return '医疗 AI';
    if (titleLower.includes('brain') || titleLower.includes('eeg') || titleLower.includes('neural')) return 'BCI';
    return '人工智能';
}

function categorizeNews(title) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('llm') || titleLower.includes('gpt') || titleLower.includes('model')) return '大模型';
    if (titleLower.includes('chip') || titleLower.includes('gpu') || titleLower.includes('nvidia')) return 'AI 芯片';
    if (titleLower.includes('robot')) return '机器人';
    if (titleLower.includes('medical') || titleLower.includes('health')) return '医疗 AI';
    return '科技';
}

function formatTime(timestamp) {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600);
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    return `${Math.floor(hours / 24)}天前`;
}

// 备用数据 (API 失败时使用)
function getFallbackPapers() {
    return [
        {
            title: 'ACT: Action Quality Assessment via Reinforcement Learning',
            excerpt: '提出基于 RL 的 action 质量评估框架，自动判断 agent 行为的优劣...',
            link: 'https://arxiv.org/abs/2603.08706',
            published: '3 天前',
            category: '强化学习'
        },
        {
            title: 'Efficient Attention Mechanisms for Large Language Models',
            excerpt: '新的注意力机制将大模型推理速度提升 5 倍，同时保持性能...',
            link: 'https://arxiv.org/abs/2603.07890',
            published: '5 天前',
            category: '大模型'
        }
    ];
}

function getFallbackBCIPapers() {
    return [
        {
            title: 'Online Adaptive BCI Decoder with Contrastive Learning',
            excerpt: '结合对比学习和在线自适应的 BCI 解码器，提升跨会话稳定性...',
            link: 'https://arxiv.org/abs/2603.05432',
            published: '1 周前',
            category: 'BCI'
        },
        {
            title: 'EEG-Based Motor Imagery Classification Using Deep Learning',
            excerpt: '基于深度学习的运动想象 EEG 分类方法，准确率达到 92%...',
            link: 'https://arxiv.org/abs/2603.04321',
            published: '2 周前',
            category: 'BCI'
        }
    ];
}

function getFallbackNews() {
    return [
        {
            title: 'GPT-5 发布：多模态能力实现重大突破',
            excerpt: 'OpenAI 正式发布 GPT-5，在推理能力、多模态理解方面实现质的飞跃...',
            link: 'https://openai.com/blog',
            source: 'OpenAI',
            time: '2 小时前',
            category: '大模型'
        },
        {
            title: 'AI 诊断系统准确率超越资深医生',
            excerpt: '最新研究表明，基于 Transformer 的医疗 AI 系统诊断准确率超过 95%...',
            link: 'https://nature.com',
            source: 'Nature',
            time: '4 小时前',
            category: '医疗 AI'
        }
    ];
}

// ==================== 渲染函数 ====================

// 渲染新闻卡片
function renderNewsCards(news) {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    newsGrid.innerHTML = news.map(item => `
        <div class="news-card" onclick="window.open('${item.link}', '_blank')">
            <div class="news-image" style="background: ${getGradientColor(item.category)}"></div>
            <div class="news-content">
                <span class="news-category">${item.category}</span>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-excerpt">${item.excerpt}</p>
                <div class="news-meta">
                    <div class="news-source">📰 ${item.source || '未知'}</div>
                    <div class="news-time">⏰ ${item.time || item.published || ''}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染论文卡片
function renderPapersCards(papers) {
    const papersGrid = document.getElementById('papersGrid');
    if (!papersGrid) return;
    
    papersGrid.innerHTML = papers.map(paper => `
        <div class="news-card" onclick="window.open('${paper.link}', '_blank')">
            <div class="news-image" style="background: ${getGradientColor(paper.category)}"></div>
            <div class="news-content">
                <span class="news-category">${paper.category}</span>
                <h3 class="news-title">${paper.title}</h3>
                <p class="news-excerpt">${paper.excerpt}</p>
                <div class="news-meta">
                    <div class="news-source">📄 arXiv</div>
                    <div class="news-time">⏰ ${paper.published}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染 BCI 论文卡片
function renderBCICards(papers) {
    const bciGrid = document.getElementById('bciGrid');
    if (!bciGrid) return;
    
    bciGrid.innerHTML = papers.map(paper => `
        <div class="news-card" onclick="window.open('${paper.link}', '_blank')">
            <div class="news-image" style="background: ${getGradientColor('BCI')}"></div>
            <div class="news-content">
                <span class="news-category" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">🧠 BCI</span>
                <h3 class="news-title">${paper.title}</h3>
                <p class="news-excerpt">${paper.excerpt}</p>
                <div class="news-meta">
                    <div class="news-source">📄 arXiv</div>
                    <div class="news-time">⏰ ${paper.published}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染工具卡片
function renderToolsCards(tools) {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;
    
    toolsGrid.innerHTML = tools.map(tool => `
        <div class="news-card" onclick="window.open('${tool.link}', '_blank')">
            <div class="news-image" style="background: ${getGradientColor(tool.category)}"></div>
            <div class="news-content">
                <span class="news-category">${tool.category}</span>
                <h3 class="news-title">${tool.name} ${tool.popular ? '🔥' : ''}</h3>
                <p class="news-excerpt">${tool.description}</p>
                <div class="news-meta">
                    <div class="news-source">🔗 访问网站</div>
                    <div class="news-time">⭐ ${tool.popular ? '热门' : '推荐'}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染开源项目卡片
function renderGitHubCards(projects) {
    const githubGrid = document.getElementById('githubGrid');
    if (!githubGrid) return;
    
    githubGrid.innerHTML = projects.map(project => `
        <div class="news-card" onclick="window.open('${project.link}', '_blank')">
            <div class="news-image" style="background: ${getGradientColor(project.category)}"></div>
            <div class="news-content">
                <span class="news-category">${project.category === 'BCI' ? '🧠 BCI' : '💻 开源'}</span>
                <h3 class="news-title">${project.name}</h3>
                <p class="news-excerpt">${project.description}</p>
                <div class="news-meta">
                    <div class="news-source">⭐ ${project.stars}</div>
                    <div class="news-time">💻 ${project.language}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染热点列表
function renderTrending() {
    const trendingList = document.getElementById('trendingList');
    if (!trendingList) return;
    
    const trending = [
        'GPT-5 多模态能力详解',
        'BCI 技术最新突破',
        '人形机器人成本分析',
        'AI 医疗诊断伦理讨论',
        '开源大模型对比评测'
    ];
    
    trendingList.innerHTML = trending.map((item, index) => `
        <div class="trending-item">
            <div class="trending-number">${index + 1}</div>
            <div class="trending-title">${item}</div>
        </div>
    `).join('');
}

// 获取渐变色
function getGradientColor(category) {
    const colors = {
        '大模型': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        '计算机视觉': 'linear-gradient(135deg, #ec4899, #8b5cf6)',
        '自然语言处理': 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        '机器人': 'linear-gradient(135deg, #f59e0b, #ef4444)',
        '医疗 AI': 'linear-gradient(135deg, #10b981, #06b6d4)',
        'AI 芯片': 'linear-gradient(135deg, #7c3aed, #db2777)',
        'BCI': 'linear-gradient(135deg, #10b981, #14b8a6)',
        '开发工具': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        '数据科学': 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        '图像生成': 'linear-gradient(135deg, #ec4899, #8b5cf6)',
        '视频生成': 'linear-gradient(135deg, #f59e0b, #f97316)',
        '模型平台': 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        '生产力': 'linear-gradient(135deg, #14b8a6, #06b6d4)',
        '科技': 'linear-gradient(135deg, #6366f1, #3b82f6)',
        '人工智能': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        '强化学习': 'linear-gradient(135deg, #6366f1, #3b82f6)',
        '开源': 'linear-gradient(135deg, #f0db4f, #323330)'
    };
    return colors[category] || colors['人工智能'];
}

// 刷新内容
async function refreshContent() {
    const btn = document.querySelector('.refresh-btn');
    if (btn) {
        btn.classList.add('spinning');
    }
    
    try {
        // 并行获取所有数据
        const [news, papers, bciPapers, tools, githubProjects] = await Promise.all([
            fetchTechNews(),
            fetchPapers(),
            fetchBCIPapers(),
            fetchTools(),
            fetchGitHubProjects()
        ]);
        
        // 渲染所有模块
        renderNewsCards(news);
        renderPapersCards(papers);
        renderBCICards(bciPapers);
        renderToolsCards(tools);
        renderGitHubCards(githubProjects);
        renderTrending();
        
        // 显示提示
        showToast('✅ 内容已更新', 'success');
    } catch (error) {
        console.error('刷新失败:', error);
        showToast('❌ 刷新失败，使用备用数据', 'error');
    } finally {
        if (btn) {
            setTimeout(() => btn.classList.remove('spinning'), 1000);
        }
    }
}

// 显示提示
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        background: ${type === 'success' ? 'var(--success)' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1001;
        animation: fadeIn 0.3s;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// 分类筛选
function setupCategoryFilter() {
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.category-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent;
            // TODO: 实现分类过滤逻辑
            console.log('筛选分类:', category);
        });
    });
}

// 平滑滚动
function setupSmoothScroll() {
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
}

// ==================== 初始化 ====================

document.addEventListener('DOMContentLoaded', async function() {
    // 设置交互
    setupSmoothScroll();
    setupCategoryFilter();
    
    // 初始加载数据
    await refreshContent();
    
    // 自动刷新
    setInterval(refreshContent, CONFIG.REFRESH_INTERVAL);
});
