/*
 * @Author: czy0729
 * @Date: 2020-11-19 11:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-20 21:14:26
 */
import React from 'react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { SectionTitle as CompSectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function SectionTitle({ title, type }, { navigation }) {
  return (
    <CompSectionTitle
      style={styles.section}
      right={
        <Touchable
          style={styles.touch}
          onPress={() => {
            t('发现.跳转', {
              to: 'Channel',
              title
            })

            navigation.push('Channel', {
              type
            })
          }}
        >
          <Flex>
            <Text>频道</Text>
            <Iconfont name='md-navigate-next' color={_.colorTitle} />
          </Flex>
        </Touchable>
      }
    >
      {title}
    </CompSectionTitle>
  )
}

export default obc(SectionTitle)

const styles = _.create({
  section: {
    marginTop: 24,
    marginHorizontal: _.wind
  },
  touch: {
    paddingVertical: _.xs,
    paddingLeft: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
