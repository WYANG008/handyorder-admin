import request from '@/utils/request';

export async function getCategories(params: any) {
  return request('/server/api/seller/category/list', {
    method: 'GET',
    data: params,
  });
}

export async function addOrUpdateCategories(params: any) {
  console.log(params);
  return request('/server/api/seller/category/addOrUpdate', {
    method: 'POST',
    data: params,
  });
}

export async function deleteCategory(params: any) {
  console.log("requesting server removeCategories, ", params)
  return request('/server/api/seller/category/delete/'+params, {
    method: 'DELETE'
  });
}

export async function removeCategory(params: any) {
  console.log("requesting server removeCategories, ", params)
  return request('/server/api/seller/category/remove', {
    method: 'POST',
    data: {
      key: params
    }
  });
}