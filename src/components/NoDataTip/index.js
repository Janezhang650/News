import { tplReplace } from '../../utils/tools';
import './index.scss';
import tpl from './index.tpl';

export default {
  name: 'NoDataTip',
  tpl () {
    return tplReplace(tpl, {
      text: '！您还没有收藏新闻'
    });
  }
}
