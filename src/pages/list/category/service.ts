import request from '@/utils/request';

export async function getCategories(params: any) {
  return request('/server/api/seller/category/list', {
    method: 'GET',
    data: params,
  });
}

export async function addOrUpdateCategories(params: any) {
  console.log("call service addOrUpdateCategories with params ",params);
  return request('/server/api/seller/category/addOrUpdate', {
    method: 'POST',
    data: params,
  });
}

// export async function deleteCategoryService(params: any) {
//   console.log("requesting server removeCategories, ", params)
//   return request('/server/api/seller/category/delete/'+params, {
//     method: 'DELETE'
//   });
// }

export async function deleteCategoryServicePost(params: any) {
  console.log("requesting server removeCategories, ", params)
  return request('/server/api/seller/category/remove', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    data: params
  });
}