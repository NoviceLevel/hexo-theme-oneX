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
  
  // 添加 viewport meta 标签（如果不存在）
  if (!content.includes('viewport')) {
    content = content.replace(
      '<meta charset="UTF-8"/>',
      '<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>'
    );
  }
  
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

// hexo 目录已经是完整的主题，无需额外复制
console.log('\nHexo theme build complete!');
console.log('Theme output: hexo/');
