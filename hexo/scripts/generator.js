/**
 * Hexo Generator - 注册 RESTful API 生成器
 */

'use strict';

var restful = require('./restful');

hexo.extend.generator.register('restful', function (site) {
  return restful(hexo.config, hexo.theme.config, site);
});
