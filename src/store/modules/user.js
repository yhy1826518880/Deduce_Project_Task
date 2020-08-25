import Vue from 'vue'
// import { login, getInfo, logout } from '@/api/login'
import { login, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import jwt from 'jsonwebtoken'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        /*login(userInfo)
          .then(response => {
            const result = response.data
            Vue.ls.set(
              ACCESS_TOKEN,
              result.access_token,
              7 * 24 * 60 * 60 * 1000
            )
            commit('SET_TOKEN', result.access_token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })*/
        const result = {
          access_token: 'abcdef'
        }
        Vue.ls.set(ACCESS_TOKEN, result.access_token, 7 * 24 * 60 * 60 * 1000)
        commit('SET_TOKEN', result.access_token)
        resolve()
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // const token = Vue.ls.get(ACCESS_TOKEN)
        // const result = jwt.decode(token)
        // const rolesSet = result.authorities
        // if (rolesSet.length > 1) {
        //   result.role = {
        //     id: 'admin',
        //     name: '管理员',
        //     permissionList: ['dashboard', 'exception', 'result', 'profile', 'table', 'form', 'order', 'permission', 'role', 'table', 'user', 'support']
        //   }
        // }
        const result = {}
        result.role = {
          id: 'admin',
          name: '管理员',
          permissionList: [
            'simApplication',
            'dashboard',
            'exception',
            'result',
            'profile',
            'table',
            'form',
            'order',
            'permission',
            'role',
            'table',
            'user',
            'support'
          ]
        }
        // commit('SET_NAME', { name: result.username, welcome: welcome() })
        commit('SET_ROLES', result.role)
        resolve(result)
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        resolve()

        /*logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })*/
      })
    }
  }
}

export default user
