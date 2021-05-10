import * as yup from 'yup';

import { FormFields } from './fields';

export const signInSchema = yup.object().shape({
  [FormFields.email]: yup
    .string()
    .email('Invalid Email')
    .required('Email is required'),
  [FormFields.password]: yup.string().min(8, 'Password is too short').required('Password id required'),
});

export const signUpSchema = yup.object().shape({
  [FormFields.email]: yup
    .string()
    .email('Invalid Email')
    .required('Email is required'),
  [FormFields.userName]: yup.string().min(5, 'Min length is 5').max(20, 'Max length is 20').required('Name is required'),
  [FormFields.password]: yup.string().min(8, 'Password is too short').required('Password is required'),
  [FormFields.repeatPassword]: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref(FormFields.password), null], 'Passwords should be the same'),
});
