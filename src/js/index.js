import './import';
import models from '../models';

async function getNewsList () {
  const data = await models.getNewsList('top', 10);
  console.log(data);
}

getNewsList()
