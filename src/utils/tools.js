// 模板替换
function tplReplace (template, templateObj) {
  return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
    return templateObj[key.trim()];
  });
}

// 左右滑动
function scrollToTop () {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
}


export {
  tplReplace,
  scrollToTop
}