/*
 * 状态公共继承
 * @Author: czy0729
 * @Date: 2019-02-26 01:18:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 04:38:49
 */
import { AsyncStorage } from 'react-native'
import { configure, extendObservable, action, toJS } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { getTimestamp } from '@utils'
import fetch from './fetch'

configure({ enforceActions: 'observed' })

export default class Store {
  /**
   * 统一setState方法
   * @version 190226 v1.0
   */
  setState = action(state => {
    Object.keys(state).forEach(key => {
      const data = state[key]
      if (!(key in this.state)) {
        // 键值不存在时需手动创建观察
        extendObservable(this.state, {
          [key]: data
        })
      } else if (typeof data === 'object' && !Array.isArray(data)) {
        this.state[key] = {
          ...this.state[key],
          ...data
        }
      } else {
        this.state[key] = data
      }
    })
  })

  /**
   * 清除state
   */
  clearState = action((key, data = {}) => {
    if (typeof this.state[key] === 'undefined') {
      extendObservable(this.state, {
        [key]: data
      })
    } else {
      this.state[key] = data
    }
  })

  /**
   * 请求并入Store, 入Store成功会设置标志位_loaded=date()
   * 请求失败后会在1秒后递归重试
   * @version 190420 v1.2
   * @param {String|Object} fetchConfig
   * @param {String|Array} stateKey 入Store的key (['a', 'b']表示this.state.a.b)
   * @param {*} otherConfig.list 是否把响应的数组转化为LIST_EMPTY结构
   * @param {*} otherConfig.storage 是否本地化
   * @return {Promise}
   */
  async fetch(fetchConfig, stateKey, otherConfig = {}) {
    const { list, storage, namespace } = otherConfig
    let _fetchConfig = {}
    if (typeof fetchConfig === 'object') {
      _fetchConfig = {
        ...fetchConfig
      }
    } else {
      _fetchConfig.url = fetchConfig
    }
    _fetchConfig.retryCb = () => this.fetch(fetchConfig, stateKey, otherConfig)

    const res = fetch(_fetchConfig)
    const data = await res

    let _data
    if (Array.isArray(data)) {
      if (list) {
        _data = {
          ...LIST_EMPTY,
          list: data,
          _loaded: getTimestamp()
        }
      } else {
        _data = data
      }
    } else {
      _data = {
        ...data,
        _loaded: getTimestamp()
      }
    }

    if (Array.isArray(stateKey)) {
      this.setState({
        [stateKey[0]]: {
          [stateKey[1]]: _data
        }
      })
    } else {
      const initState = this.state[stateKey]
      this.setState({
        [stateKey]: _data || initState
      })
    }

    if (storage) {
      const key = Array.isArray(stateKey) ? stateKey[0] : stateKey
      this.setStorage(key, undefined, namespace)
    }

    return res
  }

  /**
   * AsyncStorage.setItem
   * @param {*} *key
   * @param {*} value
   * @param {*} namesapce 空间名其实一定要传递的, 不能依赖this.getName, 打包后会丢失
   */
  setStorage(key, value, namesapce) {
    if (!key) {
      return AsyncStorage.setItem(
        `${namesapce || this.getName()}|state`,
        JSON.stringify(this.state)
      )
    }

    return AsyncStorage.setItem(
      `${namesapce || this.getName()}|${key}|state`,
      JSON.stringify(value || this.state[key])
    )
  }

  /**
   * AsyncStorage.getItem
   * @param {*} key
   */
  async getStorage(key, namesapce) {
    // @issue 打包压缩后貌似不安全, this.getName类名字会丢失?
    if (!key) {
      return JSON.parse(
        await AsyncStorage.getItem(`${namesapce || this.getName()}|state`)
      )
    }

    return JSON.parse(
      await AsyncStorage.getItem(`${namesapce || this.getName()}|${key}|state`)
    )
  }

  /**
   * 将一个observableObject转化为javascript原生的对象
   * Mobx: toJS(value: any, supportCycles?=true: boolean)
   * @version 170428 1.0
   * @param  {String} key 保存值的键值
   * @return {Object}
   */
  toJS(key) {
    return toJS(this.state[key] || this.state)
  }

  /**
   * 取类名
   */
  getName() {
    let s = this.constructor.toString()
    if (s.indexOf('function') == -1) {
      return null
    }
    s = s.replace('function', '')
    const idx = s.indexOf('(')
    s = s.substring(0, idx)
    s = s.replace(' ', '')
    return s
  }
}
