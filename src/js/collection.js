import './import';
import Header from '../components/Header';
import NewsList from '../components/NewsList';
import NoDataTip from '../components/NoDataTip';

;((doc) => {

  const oApp = doc.querySelector('#app');
  let oListWrapper = '';
  const followedList = JSON.parse(localStorage.getItem('followedList') || '[]');

  const init = () => {
    render();
    bindEvent();
  }

  function render () {
    const headerTpl = Header.tpl({
      url: '/',
      title: '我的新闻',
      showLeftIcon: true,
      showRightIcon: true
    });

    if (followedList.length) {
      const listWrapperTpl = NewsList.wrapperTpl(44);
      oApp.innerHTML += (headerTpl + listWrapperTpl);
      oListWrapper = oApp.querySelector('.news-list');
      renderList(followedList);
    } else {
      oApp.innerHTML += (headerTpl + NoDataTip.tpl());
    }

  }

  function bindEvent () {
    followedList.length && NewsList.bindEvent(oListWrapper, setCurrentNews);
  }

  function renderList (data) {
    const newsListTpl = NewsList.tpl({
      data,
      pageNum: -1
    });
    oListWrapper.innerHTML += newsListTpl;
  }

  function setCurrentNews (options) {
    const { idx } = options;
    const currentNews = followedList[idx];
    localStorage.setItem('currentNews', JSON.stringify(currentNews));
  }

  init();
})(document);