import './index.scss';
import tpl from './index.tpl';
import { tplReplace } from '../../utils/tools';

export default {
  name: 'Header',
  tpl (options) {
    const { url ,title, showLeftIcon, showRightIcon } = options;
    return tplReplace(tpl, {
      url,
      title,
      showLeftIcon: showLeftIcon ? 'block' : 'none',
      showRightIcon: showRightIcon ? 'block' : 'none'
    });
  }
}