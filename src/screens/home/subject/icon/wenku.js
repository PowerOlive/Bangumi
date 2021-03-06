/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:34:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 18:12:09
 */
import React from 'react'
import { Flex, Touchable, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconWenku(props, { $ }) {
  if ($.isLimit || !$.source.wenkuId) {
    return null
  }

  return (
    <Touchable style={styles.icon} onPress={$.toWenku8}>
      <Flex>
        <Iconfont name='md-visibility' />
        <Text style={_.ml.xs} size={13} type='sub'>
          小说
        </Text>
      </Flex>
      <Heatmap id='条目.阅读轻小说' />
    </Touchable>
  )
}

export default obc(IconWenku)

const styles = _.create({
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
