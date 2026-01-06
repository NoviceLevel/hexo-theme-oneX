# hexo-theme-oneX

基于 [hexo-theme-one](https://github.com/EYHN/hexo-theme-one) 重构的 Hexo 主题。

## 技术栈

- React 18
- TypeScript 5
- Redux Toolkit
- MUI 5 (Material UI)
- React Router 6
- Webpack 5
- Less

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm start

# 构建
pnpm build
```

## 项目结构

```
src/
├── components/     # React 组件
├── interfaces/     # TypeScript 接口定义
├── store/          # Redux Toolkit store
│   └── slices/     # Redux slices
├── lib/            # 工具函数和 API
└── main.tsx        # 入口文件
```

## License

GPL-2.0
