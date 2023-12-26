import { useFormikContext } from 'formik'
import { FC } from 'react'
import { Button, StyleSheet } from 'react-native'

interface SubmitBtnProps {
  title: string
}

const SubmitButton: FC<SubmitBtnProps> = (props) => {
  const { title } = props
  const { handleSubmit } = useFormikContext()
  return <Button title={title} onPress={handleSubmit as () => void} />
}

const styles = StyleSheet.create({
  container: {},
})

export default SubmitButton
