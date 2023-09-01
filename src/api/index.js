import { service } from '~/axios/index';
import qs from 'qs';

const lanEnv = 'zh-CN'

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

export function chatHistory(devId, data) {
  return service({
    url: "/spwapi/user/chat/history",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "lan": lanEnv,
      "Devid": devId
    },
    method: "post",
    data: qs.stringify(data),
  });
}

export function chatSample(data) {
  return service({
    url: "/spwapi/user/samplechat",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "lan": lanEnv,
    },
    method: "post",
    data: qs.stringify(data),
  });
}
