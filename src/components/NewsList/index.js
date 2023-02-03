import './index.scss';
import tpl0 from './tpl/tpl_0.tpl';
import tpl1 from './tpl/tpl_1.tpl';
import tpl2 from './tpl/tpl_2.tpl';
import tpl3 from './tpl/tpl_3.tpl';
import wrapperTpl from './tpl/wrapper.tpl';
import { tplReplace } from '../../utils/tools';

export default {
  name: 'NewsList',
  wrapperTpl (top) {
    return tplReplace(wrapperTpl, {
      top
    });
  },

  tpl (options) {
    const { pageNum, data } = options;

    let itemList ='',
        tpl = '';

    data.map((item, index) => {
      if (!item.thumbnail_pic_s) {
        tpl = tpl0;
      } else if (item.thumbnail_pic_s && !item.thumbnail_pic_s02) {
        tpl = tpl1;
      } else if (item.thumbnail_pic_s02 && !item.thumbnail_pic_s03) {
        tpl = tpl2;
      } else if (item.thumbnail_pic_s03) {
        tpl = tpl3;
      }

      itemList += tplReplace(tpl, {
        pageNum,
        index,
        url: item.url,
        uniquekey: item.uniquekey,
        author: item.author_name,
        date: item.date,
        title: item.title,
        thumbnail_pic_s: item.thumbnail_pic_s,
        thumbnail_pic_s02: item.thumbnail_pic_s02,
        thumbnail_pic_s03: item.thumbnail_pic_s03,
        category: item.category
      });
    });

    return itemList;
  },

  imgShow () {
    const oImgs = document.querySelectorAll('img');

    [...oImgs].map(img => {
      img.onload = function () {
        img.style.opacity = '1';
      }
    })
  }
}