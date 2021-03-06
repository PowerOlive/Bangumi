/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-12 17:38:19
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import IconGo from '@tinygrail/_/icon-go'
import List from './list'
import Store from './store'
import { tabs } from './ds'

const title = '资金日志'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/logs', 'TinygrailLogs'],
  withHeaderParams
})
@obc
class TinygrailLogs extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: <IconGo $={$} />
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.tinygrail}>
        <StatusBarEvents />
        {!!_loaded && (
          <Tabs
            routes={tabs}
            tabBarLength={5.6}
            renderItem={item => <List key={item.key} title={item.title} />}
          />
        )}
      </View>
    )
  }
}
