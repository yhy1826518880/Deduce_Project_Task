import { axios } from '@/utils/request'

// 查询系统日志
export function getSystemLog(data) {
  return axios({
    url: '/IndividualRecognition/exportSystemLogs',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    timeout: 30000,
    data
  })
}

export function getTaskLogs(data) {
  return axios({
    url: '/IndividualRecognition/exportTaskLogs',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    timeout: 30000,
    responseType: 'blob',
    data
  })
}
