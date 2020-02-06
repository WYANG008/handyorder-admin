// export interface TableListItem {
//   key: number;
//   disabled?: boolean;
//   href: string;
//   avatar: string;
//   name: string;
//   title: string;
//   owner: string;
//   desc: string;
//   callNo: number;
//   status: number;
//   updatedAt: Date;
//   createdAt: Date;
//   progress: number;
// }

export interface TableListItem {
  
  disabled?: boolean;
  // href?: string;
  // avatar?: string;
  productId: string;
  productName: string;
  productPrice: number;
  productStock: number;
  productStatus: number;
  categoryType: number;
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

export interface TableListParams {
  sorter?: string;
  currentPage?: number;
  productName?: string;
  productStatus?: number;
  productId?: string;
  pageSize?: number;
}
