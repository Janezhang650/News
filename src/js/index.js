import './import';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

import { news_type } from '../data';

;((doc) => {

  const oApp = doc.querySelector('#app');

  const config = {
    type: 'top'
  }

  const init = () => {
    render();
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

  // 导航标签切换状态
  function setType (type) {
    config.type = type;
  }

  init();
})(document);