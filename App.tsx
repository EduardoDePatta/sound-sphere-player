import { Provider } from 'react-redux'
import store from './src/store'
import AppNavigator from './src/navigation'
import AppContainer from './src/components/containers/AppContainer'
import Toast from 'react-native-toast-message'
function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
      <Toast />
    </Provider>
  )
}
export default App
