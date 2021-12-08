import * as yup from 'yup'

export const PostsInitValues = {
  title: '',
  image: '',
  content: ''
}

const ALLOWED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp']

export const PostsValidation = yup.object().shape({
  title: yup.string().max(200).required('Title is required'),
  image: yup.mixed().nullable().notRequired()
          .test("fileSize", "The file is too large, maximum filesize is 2MB", (value) => {
              return !value || value.size <= 2000000
          })
          .test("fileType", "Only the following formats are accepted: .jpeg, .jpg, .bmp, and .png", (value) => {
              return !value || ALLOWED_FORMATS.includes(value.type)
          }),
  content: yup.string().max(1000).required('Content is required'),
})
