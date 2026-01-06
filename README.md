# hexo-theme-oneX

基于 [hexo-theme-one](https://github.com/EYHN/hexo-theme-one) 重构的 Hexo 主题。

## 功能特性

- 🎨 主题颜色切换（支持 Cyan、Pink、Red）
- 🌍 国际化支持（中文、英文、日文）
- 📱 响应式设计
- 🎯 Material Design 风格
- ⚡ SPA 单页应用体验
- 📝 文章卡片展示
- 🔍 滚动渐变导航栏
- 💾 主题设置本地持久化

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
```

### 3. 修改 Hexo 配置

编辑博客根目录的 `_config.yml`：

```yaml
theme: oneX
```

### 4. 启动博客

```bash
hexo server
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm start

# 构建主题
pnpm build
```

## 主题配置

在博客根目录创建 `_config.oneX.yml`：

```yaml
# 头像
avatar: /images/avatar.png

# 标语
slogan: Your slogan here

# 背景图片
background: /images/bg.jpg
```

## 项目结构

```
src/
├── components/     # React 组件
│   ├── app/        # 应用入口
│   ├── menu/       # 导航栏
│   ├── drawer/     # 侧边栏
│   ├── home/       # 首页
│   ├── post/       # 文章详情
│   ├── postCard/   # 文章卡片
│   ├── logoCard/   # Logo 卡片
│   └── colorChoose/# 颜色选择器
├── interfaces/     # TypeScript 接口
├── store/          # Redux store
├── lib/            # 工具函数
├── locale/         # 国际化文件
└── main.tsx        # 入口文件
```

## License

GPL-2.0
