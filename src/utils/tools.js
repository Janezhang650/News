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

// 拉取到底部
function scrollToBottom (callback) {
  if (_getScrollTop() - _getWindowHeight() == _getScrollHeight()) {
    callback();
  }
}

function getItemNode (target) {
  while  (target = target.parentNode) {
    if (target.className.split(' ')[0] === 'news-item') {
      return target;
    }
  }
}


export {
  tplReplace,
  scrollToTop,
  setDataPage,
  scrollToBottom,
  getItemNode
}


/* --------------------------------- 内部方法 ---------------------------------*/
// 获取滚动条的距离
function _getScrollTop () {
  var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
  
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }

  if (document.documentElement) {
    documentElement = document.documentElement.scrollTop;
  }

  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;

  return scrollToTop;
}

// 获取整个文档的高度（包括滚动条的距离）
function _getScrollHeight () {
  var scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;

  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }

  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }

  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;

  return scrollHeight;
}

// 获取窗口的高度，不包含border 和 margin
function _getWindowHeight () {
  var windowHeight = 0;

  if (document.compatMode == 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }

  return windowHeight;
}