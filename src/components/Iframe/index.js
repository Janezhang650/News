import { tplReplace } from '../../utils/tools';
import './index.scss';
import tpl from './index.tpl';

export default {
  tpl (url) {
    return tplReplace(tpl, {
      url
    });
  }
}