import { FC } from 'react'
import { Image, View } from 'react-native'
import CircleUI from '../../ui/CircleUI'
import colors from '../../constants/colors'

const CirclesBackground: FC = () => {
  return (
    <>
      <CircleUI
        innerColor={colors.SECONDARY}
        outerColor={colors.SECONDARY}
        size={80}
        position={{ top: 15, left: 15 }}
      />
      <Image
        style={{
          width: 130,
          resizeMode: 'contain',
          position: 'absolute',
          top: -180,
          right: 0,
        }}
        source={require('../../assets/sound-sphere-logo.png')}
      />
      <CircleUI
        innerColor={colors.SECONDARY}
        outerColor={colors.SECONDARY}
        size={40}
        position={{ top: 120, left: 120 }}
      />
      {/* <CircleUI
        innerColor={colors.SECONDARY}
        outerColor={colors.SECONDARY}
        size={120}
        position={{ top: 80, left: 336 }}
      /> */}
      <CircleUI
        innerColor={colors.SECONDARY}
        outerColor={colors.SECONDARY}
        size={160}
        position={{ top: 500, left: 120 }}
      />
      <CircleUI
        innerColor={colors.SECONDARY}
        outerColor={colors.SECONDARY}
        size={160}
        position={{ top: 760, left: -40 }}
      />
    </>
  )
}

export default CirclesBackground
