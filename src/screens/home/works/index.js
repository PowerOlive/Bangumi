/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-13 22:54:54
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const title = '作品'

export default
@inject(Store)
@withHeader({
  title: ({ name } = {}) => `${name}的${title}`,
  screen: title,
  hm: ['works', 'Works']
})
@obc
class Works extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: '作品.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('作品.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open($.url)
              break
            default:
              break
          }
        }
      }
    })
  }

  render() {
    return (
      <View style={_.container.plain}>
        <ToolBar />
        <List />
      </View>
    )
  }
}
