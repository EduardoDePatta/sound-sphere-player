import { Formik, FormikHelpers } from 'formik'
import { ReactNode } from 'react'

interface FormProps<T> {
  initialValues: any
  validationSchema: any
  onSubmit(values: T, formikHelpers: FormikHelpers<T>): void
  children: ReactNode
}

const Form = <T extends Object>(props: FormProps<T>) => {
  const { initialValues, validationSchema, onSubmit, children } = props
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {children}
    </Formik>
  )
}

export default Form
