import { axios } from '@/utils/request'

// 查询文件是否存在
export function hasMd5(md5) {
  return axios({
    url: '/files/hasmd5/',
    method: 'get',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    timeout: 600000,
    params: {
      MD5: md5
    }
  })
}

// 合并文件
export function mergeFile(data) {
  return axios({
    url: '/files/chunks/merge',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    timeout: 600000,
    data
  })
}
