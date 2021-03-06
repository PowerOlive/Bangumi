/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-20 17:59:24
 */
import React from 'react'
import { Touchable, Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { navigationReference } from '@utils/app'
import { info } from '@utils/ui'
import { ob } from '@utils/decorators'

export const Logo = ob(({ forceUpdate }) => (
  <Touchable
    style={styles.radius}
    onPress={() => {
      t('其他.切换主题', {
        isDark: !_.isDark
      })

      info('主题切换中', 1.2)
      setTimeout(() => {
        _.toggleMode()
        if (forceUpdate) {
          // 安卓端触发重渲染
          setTimeout(() => {
            forceUpdate()
          }, 0)
        }
      }, 40)
    }}
    onLongPress={() => {
      const navigation = navigationReference()
      if (navigation) {
        navigation.push('Setting')
      }
    }}
  >
    <Flex style={styles.logo} justify='center'>
      <Iconfont
        style={styles.ios}
        size={22}
        name='bgm'
        color={_.select(_.colorTitle, _.colorDesc)}
      />
    </Flex>
  </Touchable>
))

const styles = _.create({
  radius: {
    borderRadius: _.radiusLg,
    overflow: 'hidden'
  },
  logo: {
    width: 132,
    height: 32
  },
  ios: {
    marginLeft: 4
  }
})
