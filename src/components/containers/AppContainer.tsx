import { FC, ReactNode } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface AppContainerProps {
  children: ReactNode
}

const AppContainer: FC<AppContainerProps> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default AppContainer
