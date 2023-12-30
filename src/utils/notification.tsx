import Toast from 'react-native-toast-message'

export namespace Notification {
  export const success = (successMessage: string) => {
    Toast.show({
      type: 'success',
      text1: 'Success!',
      text2: successMessage,
    })
  }
  export const error = (errorMessage: string) => {
    Toast.show({
      type: 'error',
      text1: 'Error!',
      text2: errorMessage,
    })
  }
  export const info = (infoMessage: string) => {
    Toast.show({
      type: 'info',
      text1: 'Info!',
      text2: infoMessage,
    })
  }
}
