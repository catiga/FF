import request from '@/axios/index';
import qs from 'qs'

// 邮箱登录
export function characterList(data) {
    return request({
      url: "/spwapi/user/characters",
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
      data: qs.stringify(data),
    });
}
