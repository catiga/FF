import { service } from '~/axios/index';
import qs from 'qs';

const lanEnv = 'zh-CN'

export function characterList(ct, cv) {
    return service({
      url: "/spwapi/user/characters",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "lan": lanEnv,
      },
      method: "post",
      data: qs.stringify({ct:ct, cv:cv, lan: lanEnv}),
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

export function chatSamples(data) {
  return service({
    url: "/spwapi/user/samplechats",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "lan": lanEnv,
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

export function sysCatalogs(pid) {
  return service({
    url: "/spwapi/sys/catags",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "lan": lanEnv,
    },
    method: "post",
    data: qs.stringify({pid:pid}),
  });
}

export function sysMethods() {
  return service({
    url: "/spwapi/sys/artags",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "lan": lanEnv,
    },
    method: "post",
  });
}