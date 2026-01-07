# hexo-theme-oneX

基于 [hexo-theme-one](https://github.com/EYHN/hexo-theme-one) 使用现代技术栈重构的 Hexo 主题。

## 功能特性

- 🎨 KonoSuba 角色主题颜色（Aqua、Megumin、Darkness、Kazuma、Eris、Wiz、Yunyun 等）
- 📱 响应式设计
- 🎯 Material Design 风格
- ⚡ SPA 单页应用体验
- 📝 文章卡片展示
- 🔍 全文搜索（支持中文）
- 📑 文章目录（TOC）
- 🔝 回到顶部按钮
- 💾 主题设置本地持久化
- 📂 分类/标签列表页
- 💬 Disqus 评论支持
- 🖼️ 无限滚动加载

## 技术栈

- React 18
- TypeScript 5
- Redux Toolkit
- MUI 5 (Material UI)
- React Router 6
- Webpack 5
- Less

## 安装使用

### 1. 克隆主题

```bash
cd your-hexo-blog
git clone https://github.com/NoviceLevel/hexo-theme-oneX.git themes/oneX
```

### 2. 安装依赖并构建

```bash
cd themes/oneX
pnpm install
pnpm build
node scripts/build-hexo.js
```

### 3. 修改 Hexo 配置

编辑博客根目录的 `_config.yml`：

```yaml
theme: oneX
```

### 4. 创建主题配置文件

在博客根目录创建 `_config.oneX.yml`：

```yaml
# 网站头部配置
head:
    # 网站图标 (favicon)
    favicon: "https://example.com/favicon.ico"

# 图片配置
img:
    # 头像图片，显示在首页欢迎卡片和文章卡片中
    avatar: "/img/avatar.png"
    # 首页左侧大图（欢迎卡片背景）
    left_pic: 
      - "/img/home.png"
    # 首页右侧 Logo 卡片图片
    right_pic:
      - "/img/right_pic.jpg"
    # 文章缩略图，支持多个随机显示
    post_thumbnail: 
      - "https://www.loliapi.com/acg/"
    # 侧边栏头部背景图
    drawerHeaderBg:
      - "/img/header-bg.jpg"

# UI/UX 配置
uiux:
    # 首页欢迎语，支持多个随机显示
    slogan: "为美好的世界献上祝福！"
    # 默认主题色（可选值见下方主题颜色表）
    defaultPrimaryColor: "aqua"
    # 默认强调色
    defaultAccentColor: "megumin"

# 评论系统配置
comment:
    # Disqus 评论
    disqus:
        # Disqus shortname
        shortName: "your-disqus-shortname"

# 侧边栏菜单配置
# type 类型说明:
#   - sitelink: 站内链接，使用 href 指定路径
#   - page: 独立页面，使用 name 指定页面 slug（如 about）
#   - link: 外部链接，使用 href 指定完整 URL
#   - hr: 分隔线
# icon: Material Icons 图标名称
Drawer:
    - title: 首页
      type: sitelink
      href: /
      icon: home
    - title: hr
      type: hr
    - title: 关于我
      type: page
      name: about
      icon: account_circle
    - title: 搜索
      type: sitelink
      href: /search/
      icon: search
    - title: 分类
      type: sitelink
      href: /categories
      icon: folder
    - title: 标签
      type: sitelink
      href: /tags
      icon: label

# 是否显示颜色选择器
colorPicker: true

# 首页工具栏菜单
homeToolBar:
  - icon: "more_vert"
    items:
      - title: RSS
        type: link
        href: /atom.xml
        icon: rss_feed

# 页脚配置
# 第一项为版权信息，第二项为随机显示的标语（数组）
footer:
  - "Copyright © 2026 Your Name"
  - - "标语1"
    - "标语2"
    - "标语3"
```

### 5. 创建独立页面（可选）

如需创建"关于我"等独立页面：

```bash
hexo new page about
```

编辑 `source/about/index.md`：

```markdown
---
title: 关于我
date: 2026-01-01 00:00:00
---

这里是关于我的内容...
```

### 6. 生成并启动博客

```bash
hexo generate
hexo server
```

注意：修改 `_config.oneX.yml` 后需要重新运行 `hexo generate` 才能生效。

## 开发模式

```bash
# 在 hexo-theme-oneX 目录
pnpm install

# 构建主题
pnpm build

# 构建并复制到 hexo 目录
pnpm build && node scripts/build-hexo.js

# 开发服务器（需要先在 blog 目录运行 hexo generate）
pnpm start
# 访问 http://localhost:3000
```

## 主题颜色

内置 KonoSuba 角色主题色：

| 颜色名 | 角色 | 色值 |
|--------|------|------|
| cyan | 默认 | #00BCD4 |
| aqua | 阿库娅 | #00BFFF |
| megumin | 惠惠 | #8B0000 |
| darkness | 达克尼斯 | #FFD700 |
| kazuma | 和真 | #228B22 |
| eris | 艾莉丝 | #9370DB |
| wiz | 薇兹 | #4B0082 |
| yunyun | 芸芸 | #FF69B4 |
| chomusuke | 绀碧之猫 | #2F4F4F |

## 项目结构

```text
src/
├── components/        # React 组件
│   ├── app/           # 应用入口
│   ├── menu/          # 导航栏
│   ├── drawer/        # 侧边栏
│   ├── home/          # 首页
│   ├── post/          # 文章详情
│   ├── search/        # 搜索页面
│   ├── category/      # 分类详情
│   ├── categories/    # 分类列表
│   ├── tag/           # 标签详情
│   ├── tags/          # 标签列表
│   ├── page/          # 独立页面
│   ├── postCard/      # 文章卡片
│   ├── logoCard/      # Logo 卡片
│   ├── welcomeCard/   # 欢迎卡片
│   ├── toc/           # 文章目录
│   ├── footer/        # 页脚
│   ├── background/    # 背景
│   ├── backToTop/     # 回到顶部
│   ├── sideHeader/    # 侧边栏头部
│   ├── colorChoose/   # 颜色选择器
│   └── comment/       # 评论组件
├── interfaces/        # TypeScript 接口
├── store/             # Redux store
├── lib/               # 工具函数
└── main.tsx           # 入口文件

hexo/
├── layout/            # Hexo 布局模板
├── scripts/           # Hexo 脚本（API 生成器）
└── source/            # 静态资源
```

## License

GPL-2.0
