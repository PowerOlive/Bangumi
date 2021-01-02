/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-03 05:34:20
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Loading, Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import IconLayout from './icon-layout'
import List from './list'
import Store from './store'

const title = '找文库'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['wenku', 'Wenku']
})
@observer
class Wenku extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <Flex style={styles.right}>
          <IconLayout $={$} />
          <IconHeader
            style={styles.top}
            size={22}
            name='arrow-left'
            onPress={$.scrollToTop}
          >
            <Heatmap id='文库.到顶' />
          </IconHeader>
        </Flex>
      )
    })

    hm('discovery/wenku', 'Wenku')
  }

  componentWillUnmount() {
    const { $ } = this.context
    $.scrollToOffset = null
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>{!_loaded ? <Loading /> : <List />}</View>
    )
  }
}

const styles = StyleSheet.create({
  right: {
    marginRight: -8
  },
  top: {
    marginLeft: -2,
    transform: [
      {
        rotate: '90deg'
      }
    ]
  }
})
