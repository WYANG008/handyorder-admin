interface ServerCategory {
    categoryId: string;
    categoryName: string;
    categoryType:string;
    createTime: string;
    updateTime: string;
  }
  
export interface ServerCategoryList {
    tableData: ServerCategory[];
}