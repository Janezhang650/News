import { HTTP } from '../utils/http';
import { setDataPage } from '../utils/tools';

class Models extends HTTP {
  getNewsList (type, count) {
    return new Promise((resolve, reject) => {
      this.ajax({
        url: 'Juhe/getNewsList',
        type: 'POST',
        dataType: 'JSON',
        data: {
          field: type,
        },
        success (data) {
          const pageData = setDataPage(data.result.data, count);
          resolve(pageData);
        },
        error (err) {
          reject(err);
        }
      })
    })
  }
}

export { Models };