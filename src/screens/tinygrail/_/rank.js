/*
 * @Author: czy0729
 * @Date: 2021-03-06 04:57:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-14 21:22:42
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Rank({ style, size, value }) {
  if (!value) {
    return null
  }

  const styles = memoStyles()
  return (
    <Text
      style={[
        styles.rank,
        {
          backgroundColor: value <= 500 ? '#ffc107' : '#aaa'
        },
        style
      ]}
      size={size}
      bold
      align='center'
    >
      {value}
    </Text>
  )
}

export default ob(Rank, {
  size: 10
})

const memoStyles = _.memoStyles(_ => ({
  rank: {
    minWidth: 30,
    marginRight: _.xs,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
