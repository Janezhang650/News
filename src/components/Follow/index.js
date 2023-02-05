import { tplReplace } from '../../utils/tools';
import './index.scss';
import tpl from './index.tpl';

export default {
  name: 'Follow',
  follow () {
    return tplReplace(tpl, {
      star: 'star'
    });
  },
  unfollow () {
    return tplReplace(tpl, {
      star: 'star-o'
    });
  },
  bindEvent (doFollow) {
    const oFollow = document.querySelector('.follow');

    oFollow.addEventListener('click', this._setFollow.bind(this, oFollow, doFollow), false);
  },
  _setFollow (oFollow, doFollow) {
    let className = oFollow.className;
    oFollow.className = 'follow iconfont icon-';

    switch (className) {
      case 'follow iconfont icon-star':
        className += 'star-o';
        doFollow(false);
        break;
      case 'follow iconfont icon-star-o':
        className += 'star';
        doFollow(true);
        break;
      default:
        break;
    }
  }
}