/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:26:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-30 07:47:22
 */
import { VERSION_WENKU, CDN_STATIC_WENKU, getOTA } from '@constants/cdn'
import { DATA_ALPHABET } from '@constants'
import { getTimestamp, getStorage, setStorage } from '../index'
import { xhrCustom } from '../fetch'
import { info } from '../ui'
import { getPinYinFirstCharacter } from '../thirdParty/pinyin'
import { ANIME_YEAR, SORT } from './anime'

export const WENKU_FIRST = DATA_ALPHABET
export const WENKU_YEAR = ANIME_YEAR
export const WENKU_STATUS = ['连载', '完结']
export const WENKU_ANIME = ['是', '否']
export const WENKU_CATE = [
  '电击文库',
  'MF文库J',
  '角川文库',
  '富士见文库',
  'Fami通文库',
  '集英社',
  '讲谈社',
  'HJ文库',
  'GA文库',
  '小学馆',
  '少女文库',
  '一迅社',
  '游戏剧本',
  '其他文库'
]
export const WENKU_AUTHOR = [
  '西尾维新',
  '入间人间',
  '杉井光',
  '镰池和马',
  '榊一郎',
  '合作',
  '野村美月',
  '日日日',
  '田中芳树',
  '筑地俊彦',
  '有川浩',
  '五十岚雄策',
  '京极夏彦',
  '奈须蘑菇',
  '森见登美彦',
  '米泽穗信',
  '十文字青',
  '村崎幸也',
  '矢岛さら',
  '成田良悟',
  '细音启',
  '虚渊玄',
  '时雨泽惠一',
  '铃木大辅',
  '川口士',
  '森田季节',
  '朝野始',
  '望公太',
  '桥本纺',
  '三田诚',
  '樱庭一树',
  '本田透',
  '土桥真二郎',
  '甲田学人',
  '田尾典丈',
  '新木伸',
  '绫里惠史',
  '朝浦',
  '石田衣良',
  '犬村小六',
  '平坂读',
  '唐边叶介',
  '红玉伊月',
  '小野不由美',
  '上远野浩平',
  '舞阪洸',
  '竹冈叶月',
  '镜游',
  '石川博品',
  '柑橘ゆすら',
  '岬鹭宫',
  '三河ごーすと',
  '古宫九时',
  '天泽夏月'
]
export const WENKU_SORT = [
  '发行',
  '排名',
  '热度',
  '趋势',
  '更新',
  '随机',
  '名称'
]

/**
 * v4.0.0 后从包抽离, 需对比版本号
 * 若版本比 OTA.VERSION_WENKU 的小, 请求 OTA.VERSION_STATIC 数据然后替换缓存
 * 否则直接读缓存
 */
const wenkuVersionKey = '@utils|wenku|version|210629'
const wenkuDataKey = '@utils|wenku|data|210629'
let wenku = []
let wenkuFallback = []
let loaded = false

function getData() {
  if (!loaded) {
    if (wenkuFallback.length) return wenkuFallback
    return wenku
  }

  if (loaded && wenku.length) {
    return wenku
  }

  if (!wenkuFallback.length) {
    wenkuFallback = require('@constants/json/thirdParty/wenku.min.json')
  }
  return wenkuFallback
}

/**
 * 初始化文库数据
 */
export async function init() {
  if (loaded) return

  // 云版本
  // 版本没有 OTA 高需要重新请求数据
  const version = (await getStorage(wenkuVersionKey)) || VERSION_WENKU
  const data = (await getStorage(wenkuDataKey)) || []

  const ota = getOTA()
  const needUpdate =
    (!loaded && !data.length) || parseInt(ota.VERSION_WENKU) > parseInt(version)
  if (needUpdate) {
    info('正在从云端拉取最新数据...')

    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_WENKU()
      })
      wenku = JSON.parse(_response)
      setStorage(wenkuVersionKey, parseInt(ota.VERSION_WENKU))
      setStorage(wenkuDataKey, wenku)
    } catch (error) {
      // 404
    }
    return
  }

  // 没缓存也要请求数据
  if (!data.length) {
    info('正在从云端拉取最新数据...')

    try {
      loaded = true
      const { _response } = await xhrCustom({
        url: CDN_STATIC_WENKU()
      })
      wenku = JSON.parse(_response)
      setStorage(wenkuVersionKey, version)
      setStorage(wenkuDataKey, wenku)
    } catch (error) {
      // 404
    }
    return
  }

  // 有缓存直接返回
  loaded = true
  wenku = data
}

/**
 * 只返回下标数组对象
 */
const searchCache = {}
export function search({
  sort,
  year,
  first,
  status,
  anime,
  cate,
  author
} = {}) {
  init()

  // 查询指纹
  const finger = JSON.stringify({
    sort,
    year,
    first,
    status,
    anime,
    cate,
    author
  })

  if (sort !== '随机' && searchCache[finger]) return searchCache[finger]

  let _list = []
  let yearReg
  if (year) {
    yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)
  }

  const data = getData()
  data.forEach((item, index) => {
    let match = true

    // cn: '云之彼端约定之地'
    if (match && first) {
      match = first === getPinYinFirstCharacter(item.c || item.j)
    }

    // begin: 2009
    if (match && year) match = yearReg.test(item.b)

    // status: 1
    if (match && status) {
      match = status === '连载' ? item.st === 1 : !item.st
    }

    // anime: 1, 是否动画化
    if (match && anime) {
      match = anime === '是' ? item.an === 1 : !item.an
    }

    if (match && author) match = item.a === author
    if (match && cate) match = item.ca === cate

    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b]))
      break

    case '更新':
      _list = _list.sort((a, b) =>
        String(data[b].up).localeCompare(String(data[a].up))
      )
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b]))
      break

    case '评分':
    case '排名':
      _list = _list.sort((a, b) => SORT.rating(data[a], data[b]))
      break

    case '热度':
      _list = _list.sort((a, b) => {
        if (data[a].h === data[b].h) {
          return (data[b].s || 0) - (data[a].s || 0)
        }
        return data[b].h - data[a].h
      })
      break

    case '趋势':
      _list = _list.sort((a, b) => {
        if (data[a].u === data[b].u) {
          return (data[b].s || 0) - (data[a].s || 0)
        }
        return data[b].u - data[a].u
      })
      break

    case '随机':
      _list = _list.sort(() => SORT.random())
      break

    default:
      break
  }

  const result = {
    list: _list,
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _finger: finger,
    _loaded: getTimestamp()
  }
  searchCache[finger] = result

  return result
}

export function pick(index) {
  init()
  return unzip(getData()[index])
}

export function find(id) {
  init()
  return unzip(getData().find(item => item.id == id))
}

/**
 * 转换压缩数据的key名
 * @param {*} item
 *
 * {
 *   id: 44637,
 *   w: 1359,
 *   a: '丸户史明',
 *   e: '番外 FD2 插图',
 *   c: '不起眼女主角培育法(路人女主的养成方法)',
 *   j: '冴えない彼女の育てかた',
 *   i: 'e5/21/44637_5h36F',
 *   b: '2012-07',
 *   up: '2020-02-17',
 *   ca: '富士见文库',
 *   h: 5,
 *   u: 3,
 *   l: 163.2
 *
 *   // 可能没有的键值, 使用默认值
 *   [st: 1]  1: 连载
 *   [an: 1]  1: 动画化
 *   [s: 7.8]
 *   [r: 896]
 * }
 */
export function unzip(item = {}) {
  return {
    id: item.id || 0,
    wenkuId: item.w || 0,
    status: item.st || 0,
    anime: item.an || 0,
    author: item.a || '',
    ep: item.e || '',
    cn: item.c || '',
    jp: item.j || '',
    image: item.i || '',
    begin: item.b || '',
    update: item.up || '',
    cate: item.ca || '',
    hot: item.h || 0,
    up: item.u || 0,
    len: item.l || '',
    score: item.s || 0,
    rank: item.r || 0
  }
}
