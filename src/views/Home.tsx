import { FC, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import LatestUploads from '../components/LatestUploads'
import RecommendedAudios from '../components/RecommendedAudios'
import OptionsModal from '../components/OptionsModal'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../constants/colors'
interface HomeProps {}

type Options = {
  title: string
  icon: keyof typeof MaterialCommunityIcons.glyphMap
}

const options: Options[] = [
  { title: 'add to playlist', icon: 'playlist-music' },
  { title: 'add to favorite', icon: 'cards-heart' },
]

const Home: FC<HomeProps> = () => {
  const [showOptions, setShowOptions] = useState(false)
  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioPress={(item) => {
          console.log(item)
        }}
        onAudioLongPress={() => {
          setShowOptions(true)
        }}
      />
      <RecommendedAudios
        onAudioPress={(item) => {
          console.log(item)
        }}
        onAudioLongPress={() => {
          console.log('long press')
        }}
      />
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
        options={options}
        renderitem={(item) => {
          return (
            <Pressable style={styles.optionContainer}>
              <MaterialCommunityIcons
                size={24}
                color={colors.PRIMARY}
                name={item.icon}
              />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </Pressable>
          )
        }}
      ></OptionsModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemTitle: { color: colors.PRIMARY, fontSize: 16, marginLeft: 5 },
})

export default Home
