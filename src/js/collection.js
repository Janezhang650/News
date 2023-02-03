import './import';
import Header from '../components/Header';

;((doc) => {

  const oApp = doc.querySelector('#app');
  console.log(1)

  const init = () => {
    render();
  }

  function render () {
    const headerTpl = Header.tpl({
      url: '/',
      title: '我的新闻',
      showLeftIcon: true,
      showRightIcon: true
    });

    oApp.innerHTML += headerTpl;
  }

  init();
})(document);