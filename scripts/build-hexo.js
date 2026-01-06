const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const hexoDir = path.resolve(__dirname, '../hexo');

// 确保目录存在
const dirs = [
  path.join(hexoDir, 'source'),
  path.join(hexoDir, 'layout'),
  path.join(hexoDir, 'scripts'),
];
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 复制所有静态资源文件到 hexo/source (js, map, 字体等)
const distFiles = fs.readdirSync(distDir);
const assetExtensions = ['.js', '.map', '.woff', '.woff2', '.ttf', '.eot', '.otf'];

distFiles.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (assetExtensions.includes(ext)) {
    fs.copyFileSync(path.join(distDir, file), path.join(hexoDir, 'source', file));
    console.log(`Copied: ${file} -> hexo/source/`);
  }
});

// 读取 index.html 并转换为 EJS 模板
const indexHtml = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtml)) {
  let content = fs.readFileSync(indexHtml, 'utf-8');
  
  // 替换 title 为 Hexo 变量
  content = content.replace(/<title>.*?<\/title>/, '<title><%= config.title %></title>');
  
  // 写入 layout.ejs (主布局模板)
  fs.writeFileSync(path.join(hexoDir, 'layout', 'layout.ejs'), content);
  console.log('Created: hexo/layout/layout.ejs');
  
  // 写入 index.ejs (首页模板，内容为空因为 layout 已包含所有内容)
  fs.writeFileSync(path.join(hexoDir, 'layout', 'index.ejs'), '');
  console.log('Created: hexo/layout/index.ejs');
  
  // 创建其他必要的空模板
  const templates = ['post.ejs', 'page.ejs', 'archive.ejs', 'category.ejs', 'tag.ejs'];
  templates.forEach((tpl) => {
    fs.writeFileSync(path.join(hexoDir, 'layout', tpl), '');
    console.log(`Created: hexo/layout/${tpl}`);
  });
}

// 复制整个 hexo 主题到博客目录
const blogThemeDir = path.resolve(__dirname, '../../blog/themes/oneX');

// 递归复制目录
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(hexoDir, blogThemeDir);
console.log(`\nCopied theme to: ${blogThemeDir}`);

console.log('\nHexo theme build complete!');
