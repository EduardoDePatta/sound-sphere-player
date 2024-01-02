import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store from './src/store'
import AppNavigator from './src/navigation'
import AppContainer from './src/components/containers/AppContainer'
import Toast from 'react-native-toast-message'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <AppNavigator />
        </AppContainer>
      </QueryClientProvider>
      <Toast />
    </Provider>
  )
}
export default App
