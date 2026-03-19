# 紫钺个人网站

BCI 工程师项目展示网站

## 部署到 Vercel（免费）

### 方法 1：通过 GitHub（推荐）

1. **创建 GitHub 仓库**
   ```
   - 访问 https://github.com/new
   - 仓库名：zhangziyue-website
   - 设为 Public
   ```

2. **上传代码**
   ```bash
   cd C:/Users/Hp/clawd/projects/zhangziyue-website
   git init
   git add .
   git commit -m "初始提交"
   git branch -M main
   git remote add origin https://github.com/你的用户名/zhangziyue-website.git
   git push -u origin main
   ```

3. **连接 Vercel**
   ```
   - 访问 https://vercel.com
   - 用 GitHub 账号登录
   - 点击 "New Project"
   - 导入 zhangziyue-website 仓库
   - 点击 "Deploy"
   ```

4. **完成！**
   - 获得网址：`https://zhangziyue-website.vercel.app`
   - 手机/电脑都能访问

---

### 方法 2：Vercel CLI（无需 GitHub）

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **部署**
   ```bash
   cd C:/Users/Hp/clawd/projects/zhangziyue-website
   vercel login
   vercel
   ```

3. **按提示操作**
   - 第一次问 "Set up and deploy?" → Y
   - 问 "Which scope?" → 选你的账号
   - 问 "Link to existing project?" → N
   - 问 "Project name?" → zhangziyue-website
   - 问 "In which directory is your code?" → .
   - 问 "Want to override settings?" → N

4. **完成！**

---

## 自定义内容

编辑 `index.html` 修改：
- 个人介绍
- 项目描述
- 联系方式

编辑 `style.css` 修改：
- 颜色主题
- 字体大小
- 布局样式

---

## 访问地址

部署后访问：`https://zhangziyue-website.vercel.app`
