import { FC } from 'react'
import { TextStyle, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import colors from '../constants/colors'

interface LoaderProps {
  loading: boolean
  textStyle?: TextStyle | undefined
}

const Loader: FC<LoaderProps> = ({
  loading,
  textStyle = { color: colors.CONTRAST },
}) => {
  return (
    <View>
      <Spinner
        visible={loading}
        textContent='Loading...'
        textStyle={textStyle}
      />
    </View>
  )
}

export default Loader
