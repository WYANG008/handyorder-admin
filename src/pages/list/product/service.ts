import request from '@/utils/request';
import { TableListParams } from './data';

export async function queryProduct(params?: TableListParams) {
  console.log("#####################")
  
  console.log("app env :", MOCK_ENABLED)
  return request(`${!MOCK_ENABLED ?'/server': ''}/api/seller/product/list`, {
    params,
  });
}

// export async function queryProduct(params?: TableListParams) {
//   console.log("#####################")
  
//   console.log("app env :", MOCK_ENABLED)
//   const res = request('/server/api/seller/product/list', {
//     params,
//   });
//   console.log("query res :", res)
//   const list :TableListItem[] = ((res as any).data.list) as TableListItem[];

//   for (let i=0; i< list.length; i++) {
//     list[i].updateTime = new Date(`2017-07-${Math.floor(i / 2) + 1}`);
//     list[i].createTime = new Date(`2017-07-${Math.floor(i / 2) + 1}`);
//   }
//   return list;
//   // return list.map((e :TableListItem) => {
//   //   return {
//   //     e.
//   //   }
//   // })
//   // return request('/server/api/seller/product/list', {
//   //   params,
//   // });
// }


export async function removeProduct(params: { productId: string[] }) {
  return request(`${!MOCK_ENABLED ?'/server': ''}/api/seller/product/remove`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addProduct(params: TableListParams) {
  return request(`${!MOCK_ENABLED ?'/server': ''}/api/seller/product/addOrUpdate`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateProduct(params: TableListParams) {
  return request(`${!MOCK_ENABLED ?'/server': ''}/api/seller/product/list`, {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
