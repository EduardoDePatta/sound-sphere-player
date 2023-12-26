import { useFormikContext } from 'formik'
import { FC } from 'react'
import { StyleSheet } from 'react-native'
import AppButton from '../../ui/AppButton'

interface SubmitBtnProps {
  title: string
}

const SubmitButton: FC<SubmitBtnProps> = (props) => {
  const { title } = props
  const { handleSubmit } = useFormikContext()
  return <AppButton title={title} onPress={handleSubmit as () => void} />
}

const styles = StyleSheet.create({
  container: {},
})

export default SubmitButton
