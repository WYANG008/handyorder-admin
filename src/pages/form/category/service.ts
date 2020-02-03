import request from '@/utils/request';

export async function getCategories(params: any) {
  return request('/server/api/seller/category/list', {
    method: 'GET',
    data: params,
  });
}

export async function addOrUpdateCategories(params: any) {
  console.log("requesting server addOrupdate, ", params)
  return request('/server/api/seller/category/addOrUpdate', {
    method: 'POST',
    data: params,
  });
}