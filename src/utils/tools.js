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

// 将请求回来的数据进行分页处理
function setDataPage (data, count) {
  const len = data.length,
        pageData = [];

  let index = 0;

  while (index < len) {
    pageData.push(data.slice(index, index += count));
  }

  return pageData;
}


export {
  tplReplace,
  scrollToTop,
  setDataPage
}