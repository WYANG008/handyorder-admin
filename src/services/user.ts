import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrentUser(): Promise<any> {
  console.log("start fetchig curretn user")
  return request('/server/api/seller/getCurrentUser', {method: "GET"});
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
