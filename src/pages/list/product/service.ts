import request from '@/utils/request';
import { TableListParams, ProductAddParams, CommonResult_UploadFileInfo_ } from './data';

export async function queryProduct(params?: TableListParams) {

  const res = await request(`${MOCK_ENABLED ?'/server': ''}/api/seller/product/list`, {
    params,
  });

  console.log("res product list >>>>>>")
  console.log(res.data.list);

  return {
    data: res.data.list,
    total: res.data.pageInfo.totalItems,
    success: true,
    pageSize: res.data.pageInfo.pageSize,
    current: res.data.pageInfo.page
  }

}

export async function removeProduct(params: { id: number[] }) {
  return request(`${MOCK_ENABLED ?'/server': ''}/api/seller/product/remove`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addProduct(params: ProductAddParams) {
  console.log(">>>>>>> addProduct with params: ", params);
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


/** example：/api/config/downloadFile */
// export async function downloadFile(params: {
//   // query
//   fileName?: string;
//   fileToken?: string;
// }): Promise<API.CommonResult_URL_> {
//   return request(`/api/config/downloadFile`, {
//     method: 'GET',
//     params,
//   });
// }

/** example：/api/config/uploadFile */
export async function uploadFile(
  params: {
    // query
    fileExtension?: string;
    fileType?: string;
    filedata?: string;
  },
  body: {
    /** file */
    file?: string;
  },
): Promise<CommonResult_UploadFileInfo_> {
  return request(`/server/api/seller/config/uploadFile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params,
    data: body,
  });
}