import { axios } from '@/utils/request'

// 根据类型查询系统设置
export function getSettingConfig(type) {
  return axios({
    url: '/IndividualRecognition/systemSettingConfig',
    method: 'get',
    params: {
      type: type
    }
  })
}

// 系统设置信息配置--新增
export function addSettingConfig(data) {
  return axios({
    url: '/IndividualRecognition/systemSetting/add',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    data
  })
}

// 系统设置信息配置--修改
export function modifySettingConfig(data) {
  return axios({
    url: '/IndividualRecognition/systemSetting/modify',
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    data
  })
}

// 系统设置信息配置--删除
export function deleteSettingConfig(data) {
  return axios({
    url: '/IndividualRecognition/systemSetting/delete',
    method: 'DELETE',
    params: data
  })
}
