import { FC, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../constants/colors'
import FileSelector from '../components/FileSelector'
import AppButton from '../ui/AppButton'
import CategorySelector from '../components/CategorySelector'
import { categories } from '../@types/categories'
import { DocumentPickerAsset } from 'expo-document-picker'
import * as yup from 'yup'
import client from '../api/client'
import { Keys, getFromAsyncStorage } from '../storage/asyncStorage'

interface FormFields {
  title: string
  category: string
  about: string
  file?: DocumentPickerAsset
  poster?: DocumentPickerAsset
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
}

const audioInfoSchema = yup.object().shape({
  title: yup.string().trim().required('Title is missing!'),
  category: yup.string().oneOf(categories, 'Category is missing!').required(),
  about: yup.string().trim().required('About is missing!'),
  file: yup.object().shape({
    uri: yup.string().required('Audio File is missing!'),
    size: yup.number().required('Audio File is missing!'),
    name: yup.string().required('Audio File is missing!'),
    mimeType: yup.string().required('Audio File is missing!'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    size: yup.number(),
    name: yup.string(),
    mimeType: yup.string(),
  }),
})

interface UploadProps {}

const Upload: FC<UploadProps> = (props) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [audioInfo, setAudioInfo] = useState({ ...defaultForm })

  const handleUpload = async () => {
    try {
      const finalData = await audioInfoSchema.validate(audioInfo)
      const formData = new FormData()
      formData.append('title', finalData.title)
      formData.append('about', finalData.about)
      formData.append('category', finalData.category)
      formData.append('file', {
        name: finalData.file.name,
        type: finalData.file.mimeType,
        uri: finalData.file.uri,
      } as any)
      if (finalData.poster.uri) {
        formData.append('poster', {
          name: finalData.poster.name,
          type: finalData.poster.mimeType,
          uri: finalData.poster.uri,
        } as any)
      }

      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN)
      const { data } = await client.post('audio/create', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(data)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log('validation error: ', error.message)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          buttonTitle='Select Poster'
          documentOptions={{ type: ['image/*'] }}
          onSelect={(poster) => setAudioInfo({ ...audioInfo, poster })}
          icon={
            <MaterialCommunityIcons
              name='image-outline'
              size={36}
              color={colors.SECONDARY}
            />
          }
        />
        <FileSelector
          buttonTitle='Select Audio'
          style={{ marginLeft: 20 }}
          documentOptions={{ type: ['audio/*'] }}
          onSelect={(file) => setAudioInfo({ ...audioInfo, file })}
          icon={
            <MaterialCommunityIcons
              name='image-outline'
              size={36}
              color={colors.SECONDARY}
            />
          }
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder='Title'
          style={styles.input}
          onChangeText={(text) => {
            setAudioInfo({ ...audioInfo, title: text })
          }}
        />

        <Pressable
          onPress={() => setShowCategoryModal(true)}
          style={styles.categorySelector}
        >
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder='About'
          style={styles.input}
          multiline
          onChangeText={(text) => {
            setAudioInfo({ ...audioInfo, about: text })
          }}
        />
        <CategorySelector
          data={categories}
          renderItem={(item) => {
            return <Text style={styles.category}>{item}</Text>
          }}
          title='Category'
          onRequestClose={() => {
            setShowCategoryModal(false)
          }}
          visible={showCategoryModal}
          onSelect={(item) => {
            setAudioInfo({ ...audioInfo, category: item })
          }}
        />
        <View style={{ marginBottom: 20 }} />
        <AppButton title='Submit' borderRadius={7} onPress={handleUpload} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.CONTRAST_2,
    marginLeft: 5,
    fontStyle: 'italic',
  },
})

export default Upload
