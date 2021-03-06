/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-05 22:22:42
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@screens/_'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconEp(props, { $, navigation }) {
  const { epsThumbs, epsThumbsHeader, filterEps } = $.state
  return (
    <IconTouchable
      name='md-menu'
      onPress={() => {
        t('条目.跳转', {
          to: 'Episodes',
          from: '章节',
          subjectId: $.subjectId
        })

        navigation.push('Episodes', {
          subjectId: $.subjectId,
          name: $.cn || $.jp,
          epsThumbs,
          epsThumbsHeader,
          filterEps
        })
      }}
    >
      <Heatmap
        right={13}
        id='条目.跳转'
        data={{
          from: '章节'
        }}
      />
    </IconTouchable>
  )
}

export default obc(IconEp)
