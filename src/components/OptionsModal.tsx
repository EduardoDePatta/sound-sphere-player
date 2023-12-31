import { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import BasicModalContainer from '../ui/BasicModalContainer'

interface OptionsModalProps<T> {
  visible: boolean
  onRequestClose: () => void
  options: T[]
  renderitem: (item: T) => JSX.Element
}

const OptionsModal = <T extends any>({
  onRequestClose,
  visible,
  options,
  renderitem,
}: OptionsModalProps<T>) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      {options.map((item, index) => {
        return <View key={index}>{renderitem(item)}</View>
      })}
    </BasicModalContainer>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default OptionsModal
