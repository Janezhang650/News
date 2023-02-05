import './import';
import Header from '../components/Header';
import NewsFrame from '../components/Iframe';
import Follow from '../components/Follow';
import { getUrlQueryValue } from '../utils/tools';

;((doc) => {
  const oApp = doc.querySelector('#app');
  const currentNews = JSON.parse(localStorage.getItem('currentNews'));
  const followedList = JSON.parse(localStorage.getItem('followedList') || '[]');

  const init = () => {
    render();
    bindEvent();
  }

  function render () {
    const headerTpl = Header.tpl({
      url: getUrlQueryValue('path'),
      title: '新闻详情',
      showLeftIcon: true,
      showRightIcon: false
    });

    const newsFrameTpl = NewsFrame.tpl(currentNews.url);
    const followTpl = createFollowTpl();

    oApp.innerHTML += (headerTpl + newsFrameTpl + followTpl);
  }

  function createFollowTpl () {
    const isExit = followedList.find(item => item.uniquekey === currentNews.uniquekey);

    return isExit ? Follow.follow() : Follow.unfollow();
  }

  function bindEvent () {
    Follow.bindEvent(doFollow);
  }

  function doFollow (status) {
    let followedList = JSON.parse(localStorage.getItem('followedList') || '[]');
    if (status) {
      followedList.push(currentNews);
    } else {
      followedList = followedList.filter(item => item.uniquekey !== currentNews.uniquekey);
    }

    localStorage.setItem('followedList', JSON.stringify(followedList));
  }

  init();
})(document);