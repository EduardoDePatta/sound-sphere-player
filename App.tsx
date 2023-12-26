import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import SignUp from './src/views/auth/SignUp'

const App = () => {
  return (
    <>
      <SignUp />
      <ExpoStatusBar hidden />
    </>
  )
}
export default App
