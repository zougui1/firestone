import { createFormHook } from '@tanstack/react-form';
import { lazy } from 'react';

import { fieldContext, formContext } from './context';

const TextField = lazy(() => import('./fields/FormTextField.tsx'));
const Textarea = lazy(() => import('./fields/FormTextarea.tsx'));
const Button = lazy(() => import('./buttons/FormButton.tsx'));
const ResetButton = lazy(() => import('./buttons/FormResetButton.tsx'));

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    Textarea,
  },
  formComponents: {
    Button,
    ResetButton,
  },
  fieldContext,
  formContext,
});

export * from './utils';
