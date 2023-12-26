import { FC } from 'react'
import { Entypo } from '@expo/vector-icons'
import colors from '../constants/colors'

interface PasswordVisibilityIconProps {
  privateIcon: boolean
}

const PasswordVisibilityIcon: FC<PasswordVisibilityIconProps> = ({
  privateIcon,
}) => {
  return privateIcon ? (
    <Entypo name='eye' size={16} color={colors.SECONDARY} />
  ) : (
    <Entypo name='eye-with-line' size={16} color={colors.SECONDARY} />
  )
}

export default PasswordVisibilityIcon
