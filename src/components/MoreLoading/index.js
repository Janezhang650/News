import { tplReplace } from '../../utils/tools';
import './index.scss';
import tpl from './index.tpl';

export default {
  name: 'MoreLoading',
  _tpl (isLoading) {
    return tplReplace(tpl, {
      isLoading: isLoading ? 'loading' : '',
      text: isLoading ? '正在加载更多' : '没有更多新闻了'
    });
  },
  remove (oList) {
    const oMoreLoading = oList.querySelector('.more-loading');

    oMoreLoading && oMoreLoading.remove();
  },
  add (oList, isLoading) {
    const oMoreLoading = oList.querySelector('.more-loading');

    if (!oMoreLoading) {
      oList.innerHTML += this._tpl(isLoading);
    }
  }
}