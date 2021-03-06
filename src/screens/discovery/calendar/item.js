/*
 * @Author: czy0729
 * @Date: 2019-03-22 09:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-05 14:08:41
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text } from '@components'
import { Cover, Tag, Stars } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { COLLECTION_INDENT } from '@constants'

const gridStyles = _.grid()

function Item(
  { style, subjectId, images = {}, name, score },
  { $, navigation }
) {
  const { type } = $.state
  const collection = $.userCollectionsMap[subjectId]
  if (type === 'collect' && !collection) return null

  const { air, timeCN } = $.onAir[subjectId] || {}
  const onPress = () => {
    t('每日放送.跳转', {
      to: 'Subject',
      subjectId
    })

    navigation.push('Subject', {
      subjectId,
      _cn: name,
      _image: images.medium
    })
  }

  const showScore = !systemStore.setting.hideScore && !!score
  const indent = collection ? COLLECTION_INDENT : ''
  return (
    <View style={[styles.item, style]}>
      <View>
        <Cover
          style={styles.cover}
          width={gridStyles.width}
          height={gridStyles.height}
          src={images.medium}
          radius
          shadow
          onPress={onPress}
        />
        {!!timeCN && (
          <View style={styles.time} pointerEvents='none'>
            <Text style={styles.timeText} size={12} bold>
              {' '}
              {timeCN.slice(0, 2)}:{timeCN.slice(2)}{' '}
            </Text>
          </View>
        )}
      </View>
      <Touchable style={_.mt.sm} withoutFeedback onPress={onPress}>
        {!!collection && <Tag style={styles.collection} value={collection} />}
        <Text size={12} bold lineHeight={_.device(13, 15)} numberOfLines={2}>
          {indent}
          {HTMLDecode(name)}
        </Text>
        <Flex style={_.mt.xs}>
          {!!air && (
            <Text style={_.mr.sm} size={11} type='main' bold>
              {air}话
            </Text>
          )}
          {showScore && <Stars simple value={score} />}
        </Flex>
      </Touchable>
    </View>
  )
}

export default obc(Item)

const styles = _.create({
  item: {
    width: gridStyles.width,
    marginLeft: gridStyles.marginLeft,
    marginBottom: _.space
  },
  time: {
    position: 'absolute',
    zIndex: 1,
    top: _.sm,
    left: _.sm,
    paddingVertical: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
    borderRadius: _.radiusXs
  },
  timeText: {
    color: _.__colorPlain__
  },
  collection: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0
  },
  cover: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
})
