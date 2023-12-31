import { useFormikContext } from 'formik'
import { FC } from 'react'
import { StyleSheet } from 'react-native'
import AppButton from '../../../ui/AppButton'

interface SubmitBtnProps {
  title: string
  loading?: boolean
}

const SubmitButton: FC<SubmitBtnProps> = ({ title, loading = false }) => {
  const { handleSubmit } = useFormikContext()
  return (
    <AppButton
      loading={loading}
      title={title}
      onPress={handleSubmit as () => void}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default SubmitButton
