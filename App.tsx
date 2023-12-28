import { Provider } from 'react-redux'
import store from './src/store'
import AppNavigator from './src/navigation'
import AppContainer from './src/components/containers/AppContainer'

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </Provider>
  )
}
export default App
