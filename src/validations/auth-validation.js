import * as yup from 'yup'

export const LoginInitValues = {
  username: 'demo',
  password: '123456',
}

export const LoginValidation = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export const RegisterInitValues = {
  username: '',
  password: '',
  confirmPassword: '',
}

export const RegisterValidation = yup.object().shape({
  username: yup.string().trim().min(4).required('Username is required')
            .matches(/^\S*$/, 'Username cannot contain spaces'),
  password: yup.string().trim().min(6).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password didn\'t match'),
})
