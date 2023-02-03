import './index.scss';
import itemTpl from './tpl/item.tpl';
import navTpl from './tpl/index.tpl';
import { tplReplace, scrollToTop } from '../../utils/tools';

export default {
  name: 'NavBar',
  _curIdx: 0,
  tpl (data) {
    let itemList = '';

    data.map(({ type, title }, index) => {
      itemList += tplReplace(itemTpl, {
        isCurrent: !index ? 'current' : '',
        type,
        title
      });
    });

    return tplReplace(navTpl, {
      itemList,
      wrapperWidth: .6 * data.length
    });
  },

  bindEvent (setType) {
    const oNav = document.querySelector('.nav'),
          oNavItems = document.querySelectorAll('.item');

    oNav.addEventListener('click', this._setNav.bind(this, oNavItems, setType), false);
  },

  _setNav (items, setType) {
    const tar = arguments[2].target,
          className = tar.className.trim();

    if (className === 'item') {
      const type = tar.dataset.type;
      setType(type);
      scrollToTop();
      
      items[this._curIdx].className = 'item';
      this._curIdx = [].indexOf.call(items, tar);
      items[this._curIdx].className += ' current';
    }
  }
}
