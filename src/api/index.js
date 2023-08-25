import { service } from '~/axios/index';
import qs from 'qs';

const lanEnv = 'zh-CN'

// 邮箱登录
export function characterList(data) {
    return service({
      url: "/spwapi/user/character",
      headers: {
        "Content-Type": "application/json",
        "lan": lanEnv,
      },
      method: "get",
      data: qs.stringify({lan: lanEnv}),
    });
}

export function characterByCode(code) {
  return service({
    url: "/spwapi/user/character",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "lan": lanEnv,
    },
    method: "post",
    data: qs.stringify({lan: lanEnv, code: code}),
  });
}
