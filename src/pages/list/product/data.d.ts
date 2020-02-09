export interface TableListItem {
  // disabled?: boolean;
  id: number;
  name: string;
  img: UploadFileInfo;
  description:string;
  price: number;
  stock: number;
  status: number;
  category: string;
  updateTime: Date | string;
  createTime: Date | string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface ProductAddParams extends UploadFileInfo {
  id: number | null;
  name: string;
  category: string;
  // img?: UploadFileInfo;
  price: number;
  stock: number;
  description?: string;
  status?: number;
}

export interface TableListParams {
  sorter?: string;
  currentPage?: number;
  productName?: string;
  productStatus?: number;
  productId?: string;
  pageSize?: number;
}

interface UploadFileInfo {
  fileName: string;
  fileToken: string;
  md5: string;
}

export interface CommonResult_UploadFileInfo_ {
  code: number;
  data: UploadFileInfo;
  message: string;
  success: boolean;
}
