/*
 * @Author: czy0729
 * @Date: 2021-03-12 14:02:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-06 08:17:55
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const labelDS = ['全局', '持仓']

function Label({ $ }) {
  const { label } = $.state
  return (
    <SegmentedControl
      style={styles.segment}
      type='tinygrailPlain'
      tintColor={_.colorTinygrailContainer}
      backgroundColor={_.tSelect(_.colorTinygrailBorder, _.colorTinygrailBg)}
      size={11}
      values={labelDS}
      selectedIndex={labelDS.findIndex(item => item === label)}
      onValueChange={$.setLabel}
    />
  )
}

export default obc(Label)

const styles = _.create({
  segment: {
    width: 80 * _.ratio,
    height: 22 * _.ratio
  }
})
