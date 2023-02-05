import './import';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewsList from '../components/NewsList';
import PageLoading from '../components/PageLoading';
import MoreLoading from '../components/MoreLoading';

import { news_type } from '../data';
import { Models } from '../models';
import { scrollToBottom } from '../utils/tools';

const models = new Models();

;((doc) => {

  const oApp = doc.querySelector('#app');
  let oListWrapper = '',
      timer = null;

  const config = {
    type: 'top',
    count: 10,
    pageNum: 0,
    isLoading: true
  };

  // 存储请求回来的新闻数据
  const newsData = {};

  const init = async () => {
    render();
    await setNewsList();
    bindEvent();
  }

  function bindEvent () {
    NavBar.bindEvent(setType);
    NewsList.bindEvent(oListWrapper, setCurrentNews);
    window.addEventListener('scroll', scrollToBottom.bind(null, getMoreList), false);
  }

  // 模板渲染
  function render () {
    const headerTpl = Header.tpl({
      url: '/',
      title: '新闻头条',
      showLeftIcon: false,
      showRightIcon: true
    });

    const navBarTpl = NavBar.tpl(news_type);
    const listWrapperTpl = NewsList.wrapperTpl(82);

    oApp.innerHTML += (headerTpl + navBarTpl + listWrapperTpl);
    
    oListWrapper = oApp.querySelector('.news-list');
  }

  // 渲染新闻列表
  function renderList (data) {
    const { pageNum } = config;

    const newsItemTpl = NewsList.tpl({
      data,
      pageNum
    });

    MoreLoading.remove(oListWrapper);
    oListWrapper.innerHTML += newsItemTpl;
    config.isLoading = false;
    NewsList.imgShow();
  }

  // 按分类存储新闻数据
  async function setNewsList () {
    const { type, count, pageNum } = config;

    // 如果该分类数据已经在之前请求回来了，就不再向服务器发起请求，直接从缓存池获取数据
    if (newsData[type]) {
      renderList(newsData[type][pageNum]);
      return;
    }

    oListWrapper.innerHTML = PageLoading.tpl();

    // 向服务器发起请求
    newsData[type] = await models.getNewsList(type, count);
    
    setTimeout(() => {
      oListWrapper.innerHTML = '';
      renderList(newsData[type][pageNum]); // 数据渲染
    }, 1500);

  }

  // 导航标签切换
  function setType (type) {
    config.type = type; // 导航标签切换状态
    config.pageNum = 0;
    config.isLoading = false;
    oListWrapper.innerHTML = ''; // 先清空列表容器
    setNewsList(); // 重新请求数据
  }

  // 当滑到列表底部时获取更多数据
  function getMoreList () {
    if (!config.isLoading) {
      config.pageNum ++;
      clearTimeout(timer);
      const { pageNum, type } = config;

      if (pageNum >= newsData[type].length) {
        MoreLoading.add(oListWrapper, false);
      } else {
        config.isLoading = true;
        MoreLoading.add(oListWrapper, true);
        timer = setTimeout(() => {
          setNewsList();
        }, 1000);
      }
    }
  }

  function setCurrentNews (options) {
    const { idx, pageNum } = options;

    const currentNews = newsData[config.type][pageNum][idx];

    localStorage.setItem('currentNews', JSON.stringify(currentNews));
  }

  init();
})(document);