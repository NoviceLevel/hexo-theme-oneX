# hexo-theme-oneX

基于 [hexo-theme-one](https://github.com/EYHN/hexo-theme-one) 使用现代技术栈重构的 Hexo 主题。

## 功能特性

- 🎨 KonoSuba 角色主题颜色（Aqua、Megumin、Darkness、Kazuma、Eris、Wiz、Yunyun 等）
- 🌍 国际化支持（中文、英文、日文）
- 📱 响应式设计
- 🎯 Material Design 风格
- ⚡ SPA 单页应用体验
- 📝 文章卡片展示
- 🔍 全文搜索（Lunr.js）
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
# 图片配置
img:
  avatar:
    - /img/avatar.jpg
  drawerHeaderBg:
    - /img/header-bg.jpg
  post_thumbnail:
    - https://www.loliapi.com/acg/

# UI/UX 配置
uiux:
  slogan:
    - 为美好的世界献上祝福！

# 侧边栏菜单
Drawer:
  - title: 首页
    type: sitelink
    href: /
    icon: home
  - title: hr
    type: hr
  - title: 搜索
    type: sitelink
    href: /search
    icon: search
  - title: 分类
    type: sitelink
    href: /categories
    icon: folder
  - title: 标签
    type: sitelink
    href: /tags
    icon: label

# 首页工具栏
homeToolBar:
  - icon: more_vert
    items:
      - title: RSS
        type: link
        href: /atom.xml
        icon: rss_feed

# 颜色选择器
colorPicker: true

# Disqus 评论
disqus:
  shortname: your-disqus-shortname
```

### 5. 生成并启动博客

```bash
hexo generate
hexo server
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建主题
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
├── locale/            # 国际化文件
└── main.tsx           # 入口文件

hexo/
├── layout/            # Hexo 布局模板
├── scripts/           # Hexo 脚本（API 生成器）
└── source/            # 静态资源
```

## License

GPL-2.0
