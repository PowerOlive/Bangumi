/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-20 22:39:19
 */
import { observable, computed } from 'mobx'
import { userStore, timelineStore } from '@stores'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'
import store from '@utils/store'

export const tabs = MODEL_TIMELINE_TYPE.data.map(item => ({
  title: item.label
}))

export default class ScreenTimeline extends store {
  state = observable({
    scope: MODEL_TIMELINE_SCOPE.getValue('好友'),
    page: 0, // <Tabs>当前页数
    _page: 0, // header上的假<Tabs>当前页数,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage()
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    this.fetchTimeline(true)
    return res
  }

  // -------------------- get --------------------
  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  timeline(scope, type) {
    return computed(() => timelineStore.timeline(scope, type)).get()
  }

  // -------------------- fetch --------------------
  fetchTimeline = refresh => {
    const { scope, page } = this.state
    const type = MODEL_TIMELINE_TYPE.getValue(tabs[page].title)
    return timelineStore.fetchTimeline({ scope, type }, refresh)
  }

  // -------------------- page --------------------
  /**
   * @issue onTabClick与onChange在用受控模式的时候, 有冲突
   * 暂时这样解决
   */
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }
    this.setState({
      page
    })
    this.fetchTimeline(true)
    this.setStorage()
  }
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    // 这里最后一个tab是假占位, 跳回到第一个tab
    if (page + 1 === tabs.length) {
      this.setState({
        page: 0,
        _page: 0
      })
    } else {
      this.setState({
        page,
        _page: page
      })
    }

    this.fetchTimeline(true)
    this.setStorage()
  }

  onSelectScope = label => {
    const { scope } = this.state
    const nextScope = MODEL_TIMELINE_SCOPE.getValue(label)
    if (nextScope !== scope) {
      this.setState({
        scope: nextScope
      })
      this.fetchTimeline(true)
      this.setStorage()
    }
  }

  // -------------------- action --------------------
}
