import './import';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

import { news_type } from '../data';
import { Models } from '../models';

const models = new Models();

;((doc) => {

  const oApp = doc.querySelector('#app');

  const config = {
    type: 'top',
    count: 10
  };

  // 存储请求回来的新闻数据
  const newsData = {};

  const init = async () => {
    render();
    await setNewsList();
    bindEvent();
  }

  function bindEvent () {
    NavBar.bindEvent(setType)
  }

  function render () {
    const headerTpl = Header.tpl({
      url: '/',
      title: '新闻头条',
      showLeftIcon: false,
      showRightIcon: true
    });

    const navBarTpl = NavBar.tpl(news_type);

    oApp.innerHTML += (headerTpl + navBarTpl);
  }

  // 按分类存储新闻数据
  async function setNewsList () {
    const { type, count } = config;

    // 如果该分类数据已经在之前请求回来了，就不再向服务器发起请求
    if (newsData[type]) {
      return;
    }

    const pageData = await models.getNewsList(type, count);
    console.log(pageData);
  }

  // 导航标签切换状态
  function setType (type) {
    config.type = type;
  }

  init();
})(document);