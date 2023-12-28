import { FC } from 'react'
import { View } from 'react-native'

interface CircleUIProps {
  size: number
  position: {
    top: number
    left: number
  }
  innerColor: string
  outerColor: string
}

const CircleUI: FC<CircleUIProps> = ({
  size,
  position,
  innerColor,
  outerColor,
}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        position: 'absolute',
        top: position.top,
        left: position.left,
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 100,
          backgroundColor: outerColor,
          opacity: 0.3,
        }}
      />
      <View
        style={{
          width: size / 1.5,
          height: size / 1.5,
          borderRadius: 100,
          backgroundColor: innerColor,
          opacity: 0.3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [
            { translateX: (-1 * size) / 3 },
            { translateY: (-1 * size) / 3 },
          ],
        }}
      />
    </View>
  )
}

export default CircleUI
