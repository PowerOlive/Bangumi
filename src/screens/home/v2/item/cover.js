/*
 * @Author: czy0729
 * @Date: 2021-01-21 11:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 16:54:29
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Cover as CompCover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function Cover({ index, subjectId, subject }, { $, navigation }) {
  const type = MODEL_SUBJECT_TYPE.getTitle(subject.type)
  return (
    <View>
      <CompCover
        style={styles.cover}
        src={subject?.images?.medium || ''}
        size={IMG_WIDTH}
        height={IMG_HEIGHT}
        radius
        shadow
        type={type}
        onPress={() => $.onItemPress(navigation, subjectId, subject)}
        onLongPress={() => $.onItemLongPress(subjectId)}
      />
      {index === 1 && (
        <>
          <Heatmap bottom={68} id='首页.全部展开' transparent />
          <Heatmap bottom={34} id='首页.全部收起' transparent />
          <Heatmap
            id='首页.跳转'
            data={{
              to: 'Subject',
              alias: '条目'
            }}
          />
        </>
      )}
    </View>
  )
}

export default obc(Cover)

const styles = _.create({
  cover: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
})
