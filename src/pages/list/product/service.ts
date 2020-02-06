import request from '@/utils/request';
import { TableListParams } from './data';

export async function queryProduct(params?: TableListParams) {

  const res = await request(`${MOCK_ENABLED ?'/server': ''}/api/seller/product/list`, {
    params,
  });

  return {
    data: res.data.list,
    total: res.data.pageInfo.totalItems,
    success: true,
    pageSize: res.data.pageInfo.pageSize,
    current: res.data.pageInfo.page
  }

}

export async function removeProduct(params: { productId: string[] }) {
  return request(`${MOCK_ENABLED ?'/server': ''}/api/seller/product/remove`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addProduct(params: TableListParams) {
  return request(`${MOCK_ENABLED ?'/server': ''}/api/seller/product/addOrUpdate`, {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateProduct(params: TableListParams) {
  return request(`${MOCK_ENABLED ?'/server': ''}/api/seller/product/addOrUpdate`, {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
