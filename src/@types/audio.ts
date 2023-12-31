import { CategoriesTypes } from './categories'

export interface AudioData {
  id: string
  title: string
  about: string
  category: CategoriesTypes
  file: string
  poster?: string
  owner: {
    name: string
    id: string
  }
}
