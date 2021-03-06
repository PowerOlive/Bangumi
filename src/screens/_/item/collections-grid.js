/*
 * @Author: czy0729
 * @Date: 2019-05-26 14:45:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 06:54:25
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Tag, Cover, Stars, Rank } from '../base'

export const ItemCollectionsGrid = ob(
  ({
    style,
    navigation,
    event = EVENT,
    id,
    cover,
    name,
    nameCn,
    score,
    isCollect,
    collection,
    typeCn,
    textOnly,
    num = 3,
    rank,
    aid,
    wid,
    mid
  }) => {
    const gridStyles = _.grid(num)
    const _collection = collection || (isCollect ? '已收藏' : '')
    const onPress = () => {
      const { id: eventId, data: eventData } = event
      const subjectId = String(id).replace('/subject/', '')
      t(eventId, {
        to: 'Subject',
        subjectId,
        type: 'grid',
        ...eventData
      })

      navigation.push('Subject', {
        subjectId,
        _jp: name,
        _cn: nameCn,
        _image: cover,
        _aid: aid,
        _wid: wid,
        _mid: mid,
        _type: typeCn
      })
    }
    return (
      <View
        style={[
          {
            width: gridStyles.width,
            marginBottom: gridStyles.marginLeft + _.xs,
            marginLeft: gridStyles.marginLeft
          },
          style
        ]}
      >
        <Cover
          style={styles.cover}
          size={gridStyles.width}
          height={gridStyles.height}
          src={cover}
          radius
          shadow
          type={typeCn}
          textOnly={textOnly}
          onPress={onPress}
        />
        {!!_collection && <Tag style={styles.collection} value={_collection} />}
        <Touchable withoutFeedback onPress={onPress}>
          <Text
            style={_.mt.sm}
            size={11}
            lineHeight={13}
            numberOfLines={3}
            bold
            align='center'
          >
            {HTMLDecode(nameCn || name)}
          </Text>
          {!!score && (
            <Flex style={_.mt.xs} justify='center'>
              <Rank style={_.mr.xs} value={rank} size={9} />
              <Stars value={score} color='warning' size={9} />
            </Flex>
          )}
        </Touchable>
      </View>
    )
  }
)

const styles = _.create({
  cover: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: _.xs,
    left: _.xs
  }
})
