import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  // console.log("start requesting localhost api")
  return request('http://localhost/server/api/seller/login', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/server/api/login/captcha?mobile=${mobile}`);
}
