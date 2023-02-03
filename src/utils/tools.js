// 模板替换
function tplReplace (template, templateObj) {
  return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
    return templateObj[key.trim()];
  });
}

export {
  tplReplace
}