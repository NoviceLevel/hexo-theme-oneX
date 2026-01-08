const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const hexoDir = path.resolve(__dirname, '../hexo');

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

const distFiles = fs.readdirSync(distDir);
const assetExtensions = ['.js', '.map', '.woff', '.woff2', '.ttf', '.eot', '.otf'];

distFiles.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (assetExtensions.includes(ext)) {
    fs.copyFileSync(path.join(distDir, file), path.join(hexoDir, 'source', file));
  }
});

const indexHtml = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtml)) {
  let content = fs.readFileSync(indexHtml, 'utf-8');
  content = content.replace(/<title>.*?<\/title>/, '<title><%= config.title %></title>');
  if (!content.includes('viewport')) {
    content = content.replace(
      '<meta charset="UTF-8"/>',
      '<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>'
    );
  }
  fs.writeFileSync(path.join(hexoDir, 'layout', 'layout.ejs'), content);
  fs.writeFileSync(path.join(hexoDir, 'layout', 'index.ejs'), '');
  const templates = ['post.ejs', 'page.ejs', 'archive.ejs', 'category.ejs', 'tag.ejs'];
  templates.forEach((tpl) => {
    fs.writeFileSync(path.join(hexoDir, 'layout', tpl), '');
  });
}

const blogDir = path.resolve(__dirname, '../../blog');
const blogThemeDir = path.resolve(blogDir, 'themes/oneX');

if (fs.existsSync(blogDir)) {
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
}
