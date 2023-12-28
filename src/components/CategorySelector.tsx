import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import colors from '../constants/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'

interface CategorySelectorProps<T> {
  data: T[]
  visible?: boolean
  title?: string
  onSelect: (item: T, index: number) => void
  renderItem: (item: T) => JSX.Element
  onRequestClose?: () => void
}

const CategorySelector = <T extends any>({
  visible = false,
  title,
  data,
  renderItem,
  onSelect,
  onRequestClose,
}: CategorySelectorProps<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleSelect = (item: T, index: number) => {
    setSelectedIndex(index)
    onSelect(item, index)
    onRequestClose && onRequestClose()
  }

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <View style={styles.modalContainer}>
        <Pressable onPress={onRequestClose} style={styles.backdrop} />
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView>
            {data?.map((item, index) => {
              return (
                <Pressable
                  onPress={() => handleSelect(item, index)}
                  key={index}
                  style={styles.selectorContainer}
                >
                  {selectedIndex === index ? (
                    <MaterialCommunityIcons
                      name='radiobox-marked'
                      color={colors.SECONDARY}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name='radiobox-blank'
                      color={colors.SECONDARY}
                    />
                  )}
                  {renderItem(item)}
                </Pressable>
              )
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {},
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONTRAST,
    zIndex: -1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 15,
    backgroundColor: colors.CONTRAST,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.PRIMARY,
    paddingVertical: 15,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default CategorySelector
