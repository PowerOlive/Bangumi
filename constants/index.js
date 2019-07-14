/*
 * 公共变量
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 12:30:58
 */
import { Platform } from 'react-native'
// import Constants from 'expo-constants'
import { Constants } from 'expo'

export const IOS = Platform.OS === 'ios'
export const MI = Constants.deviceName.includes('MI') // 小米MIUI

// APP
export const APP_ID = 'bgm8885c4d524cd61fc'
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd'

// URL
export const HOST_NAME = 'bangumi.tv'
export const HOST = `https://${HOST_NAME}`
export const HOST_2 = 'https://bgm.tv'
export const HOST_MIRRO = 'https://mirror.bgm.rin.cat'
export const OAUTH_URL = `${HOST}/oauth/authorize`
export const OAUTH_REDIRECT_URL = HOST
export const NING_MOE_HOST = 'https://www.ningmoe.com'
export const ANITAMA_HOST = 'https://app.anitama.net/'
// export const OAUTH_REDIRECT_URL = Constants.linkingUri

// GITHUB
export const FEEDBACK_URL = `${HOST}/group/topic/350677`
export const GITHUB_URL = 'https://github.com/czy0729/Bangumi'
export const GITHUB_RELEASE_URL = `${GITHUB_URL}/releases`
export const GITHUB_RELEASE_REPOS_URL =
  'https://api.github.com/repos/czy0729/Bangumi/releases'
export const GITHUB_RELEASE_VERSION = '0.8' // since 20190623

// 图片
// 白
export const IMG_DEFAULT_AVATAR = '//lain.bgm.tv/pic/user/s/icon.jpg'
export const IMG_EMPTY = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////GQAJyAPKSOz6nwAAAABJRU5ErkJggg=='
}
// 灰
// export const IMG_EMPTY = {
//   uri:
//     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP48ePHfwAJvAPoaIODcwAAAABJRU5ErkJggg=='
// }

export const IMG_DEFAULT = require('@assets/images/default.png')
export const IMG_ERROR = require('@assets/images/icon/pic-error-defult.png')

// 全局统一列表数据结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },
  _list: [], // 用于某些方法制造分页效果
  _loaded: false
}

// LIMIT
export const LIST_LIMIT = 20 // 用于制造分页数据
export const LIST_COMMENTS_LIMIT = 20
export const TOPIC_PUSH_LIMIT = 300 // 对评论大于300的帖子进行网页跳转
