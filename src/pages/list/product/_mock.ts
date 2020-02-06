import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from './data';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      productId: index + "",
      disabled: i % 6 === 0,
      // href: 'https://ant.design',
      // avatar: [
      //   'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      //   'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      // ][i % 2],
      productName: `TradeCode ${index}`,
      productPrice: 100 +Math.random()*100,
      productStock: 100 +Math.random()*100,
      productStatus: Math.random() > 0.5? 1: 0,
      categoryType: Math.random() > 0.5? 1: 2,
      updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
      createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`)
    });
  }
  return tableListDataSource;
};

let tableListDataSource = genList(1, 4);

function getRule(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const { current = 1, pageSize = 4 } = req.query;
  const params = (parse(url, true).query as unknown) as TableListParams;

  let dataSource = genList(current as number, pageSize as number);

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  // if (params.productStatus) {
  //   const status = params.productStatus.split(',');
  //   let filterDataSource: TableListItem[] = [];
  //   status.forEach((s: string) => {
  //     filterDataSource = filterDataSource.concat(
  //       dataSource.filter(item => {
  //         if (parseInt(`${item.productStatus}`, 10) === parseInt(s.split('')[0], 10)) {
  //           return true;
  //         }
  //         return false;
  //       }),
  //     );
  //   });
  //   dataSource = filterDataSource;
  // }

  if (params.productName) {
    dataSource = dataSource.filter(data => data.productName.includes(params.productName || ''));
  }
  const result = {
    data: dataSource,
    total: 103,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  console.log("mocked return")
  console.log(result)
  return res.json(result);

}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, productId, productName, productPrice, productStatus } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => productId.indexOf(item.productId) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        productId: i + "",
        disabled: i % 6 === 0,
        // href: 'https://ant.design',
        // avatar: [
        //   'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        //   'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        // ][i % 2],
        productName: `TradeCode ${i}`,
        productPrice: 100 +Math.random()*100,
        productStock: 100 +Math.random()*100,
        productStatus: Math.random() > 0.5? 1: 0,
        categoryType: Math.random() > 0.5? 1: 2,
        updateTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
        createTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`)
      });
      break;
    case 'update':
      console.log("正在update >>>>>>>>>>>>>>>>>")
      tableListDataSource = tableListDataSource.map(item => {
        if (item.productId === productId) {
          return { ...item,productName, productPrice, productStatus };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  console.log("返回 >>>>>>>>>>>>>>>>>", result)

  return res.json(result);
}

export default {
  'GET /api/seller/product/list': getRule,
  'POST /api/seller/product/addOrUpdate': postRule,
};
