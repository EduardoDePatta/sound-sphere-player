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
import BasicModalContainer from '../ui/BasicModalContainer'

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
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
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
    </BasicModalContainer>
  )
}

const styles = StyleSheet.create({
  container: {},

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
