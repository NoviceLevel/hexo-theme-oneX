# hexo-theme-oneX

基于 [hexo-theme-one](https://github.com/EYHN/hexo-theme-one) 使用现代技术栈重构的 Hexo 主题。

## 预览

![preview](https://www.loliapi.com/acg/)

## 功能特性

- KonoSuba 角色主题颜色（Aqua、Megumin、Darkness、Kazuma、Eris、Wiz、Yunyun 等）
- 响应式设计，完美适配移动端
- Material Design 风格
- SPA 单页应用体验
- 文章卡片展示
- 全文搜索（支持中文）
- 文章目录（TOC）
- 回到顶部按钮
- 主题设置本地持久化
- 分类/标签列表页
- Disqus 评论支持
- 无限滚动加载
- 独立页面支持

## 技术栈

- React 18
- TypeScript 5
- Redux Toolkit
- MUI 5 (Material UI)
- React Router 6
- Webpack 5
- Less

## 快速开始

### 方式一：作为 Hexo 主题使用

#### 1. 克隆主题到博客目录

```bash
cd your-hexo-blog
git clone https://github.com/NoviceLevel/hexo-theme-oneX.git themes/oneX
```

#### 2. 安装依赖并构建

```bash
cd themes/oneX
pnpm install
pnpm build
node scripts/build-hexo.js
```

#### 3. 修改 Hexo 配置

编辑博客根目录的 `_config.yml`：

```yaml
theme: oneX
```

#### 4. 创建主题配置文件

在博客根目录创建 `_config.oneX.yml`（详细配置见下方）

#### 5. 生成并启动博客

```bash
hexo generate
hexo server
```

### 方式二：GitHub Actions 自动部署

在博客仓库的 `.github/workflows/deploy.yml` 中添加主题构建步骤：

```yaml
name: Deploy Hexo Blog

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Build Theme
        run: |
          cd themes/oneX
          pnpm install
          pnpm build
          node scripts/build-hexo.js

      - name: Build Blog
        run: |
          pnpm install
          pnpm hexo generate

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```


## 主题配置

在博客根目录创建 `_config.oneX.yml`：

```yaml
# ============================================================
# hexo-theme-oneX 主题配置文件
# ============================================================

# ------------------------------------------------------------
# 网站头部配置
# ------------------------------------------------------------
head:
    # 网站图标 (favicon)，显示在浏览器标签页
    favicon: "https://example.com/favicon.ico"

# ------------------------------------------------------------
# 图片配置
# 支持单个字符串或数组（数组时随机显示）
# ------------------------------------------------------------
img:
    # 头像图片，显示在首页欢迎卡片和侧边栏
    avatar: "/img/avatar.png"

    # 首页左侧大图（欢迎卡片背景）
    # 支持多个图片随机显示
    left_pic: 
      - "/img/home.png"

    # 首页右侧 Logo 卡片图片
    right_pic:
      - "/img/right_pic.jpg"

    # 文章缩略图，支持多个随机显示
    # 推荐使用随机图片 API
    post_thumbnail: 
      - "https://www.loliapi.com/acg/"

    # 侧边栏头部背景图
    drawerHeaderBg:
      - "/img/header-bg.jpg"

# ------------------------------------------------------------
# UI/UX 配置
# ------------------------------------------------------------
uiux:
    # 首页欢迎语
    # 支持字符串或数组（数组时随机显示）
    slogan: "Hello World!"

    # 默认主题色（可选值见下方主题颜色表）
    defaultPrimaryColor: "aqua"

    # 默认强调色
    defaultAccentColor: "megumin"

# ------------------------------------------------------------
# 评论系统配置
# ------------------------------------------------------------
comment:
    # Disqus 评论（可选）
    disqus:
        # 你的 Disqus shortname
        shortName: "your-disqus-shortname"

# ------------------------------------------------------------
# 侧边栏菜单配置
# ------------------------------------------------------------
# type 类型说明:
#   - sitelink: 站内链接，使用 href 指定路径
#   - page: 独立页面，使用 name 指定页面 slug（如 about）
#   - link: 外部链接，使用 href 指定完整 URL，新窗口打开
#   - hr: 分隔线
#
# icon: Material Icons 图标名称
#   常用图标: home, search, folder, label, archive, 
#            account_circle, mail_outline, rss_feed
# ------------------------------------------------------------
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

    - title: GitHub
      type: link
      href: https://github.com/your-username
      icon: code

# ------------------------------------------------------------
# 颜色选择器
# ------------------------------------------------------------
# 是否在侧边栏显示颜色选择器
colorPicker: true

# ------------------------------------------------------------
# 首页工具栏菜单
# ------------------------------------------------------------
homeToolBar:
  - icon: "more_vert"
    items:
      - title: RSS
        type: link
        href: /atom.xml
        icon: rss_feed

# ------------------------------------------------------------
# 页脚配置
# ------------------------------------------------------------
# 格式: [版权信息, 随机标语数组]
footer:
  - "Copyright © 2026 Your Name"
  - - "标语1"
    - "标语2"
    - "标语3"
```

## 创建独立页面

### 创建"关于我"页面

```bash
hexo new page about
```

编辑 `source/about/index.md`：

```markdown
---
title: 关于我
date: 2026-01-01 00:00:00
---

## 关于我

这里是关于我的内容...

## 联系方式

- GitHub: [your-username](https://github.com/your-username)
- Email: your-email@example.com
```

### 在侧边栏添加页面链接

在 `_config.oneX.yml` 的 `Drawer` 配置中添加：

```yaml
Drawer:
    - title: 关于我
      type: page
      name: about  # 对应 source/about/index.md
      icon: account_circle
```

## 开发模式

```bash
# 进入主题目录
cd themes/oneX

# 安装依赖
pnpm install

# 开发服务器（热更新）
# 需要先在博客目录运行 hexo generate 生成 API 数据
pnpm start
# 访问 http://localhost:3000

# 构建生产版本
pnpm build

# 构建并复制到 hexo 目录
pnpm build && node scripts/build-hexo.js
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

## 常见问题

### 修改配置后没有生效？

修改 `_config.oneX.yml` 后需要重新运行 `hexo generate` 才能生效。

### 如何添加自定义图片？

将图片放在博客的 `source/img/` 目录下，然后在配置中使用 `/img/xxx.png` 引用。

### 搜索功能不工作？

确保已经运行 `hexo generate` 生成了 API 数据（`public/api/` 目录）。

### 如何禁用评论？

删除或注释掉 `_config.oneX.yml` 中的 `comment` 配置即可。

## 项目结构

```text
hexo-theme-oneX/
├── src/                   # 源代码
│   ├── components/        # React 组件
│   ├── interfaces/        # TypeScript 接口
│   ├── store/             # Redux store
│   ├── lib/               # 工具函数
│   └── main.tsx           # 入口文件
├── hexo/                  # Hexo 主题文件（构建生成）
│   ├── layout/            # EJS 布局模板
│   ├── scripts/           # Hexo 脚本（API 生成器）
│   ├── source/            # 静态资源（bundle.js）
│   └── _config.yml        # 主题默认配置
├── scripts/               # 构建脚本
│   └── build-hexo.js      # 构建 Hexo 主题
├── package.json
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## 更新主题

```bash
cd themes/oneX
git pull
pnpm install
pnpm build
node scripts/build-hexo.js
hexo generate
```

## License

GPL-2.0
