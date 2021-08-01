import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { object, string } from 'yup';
import { useAuthRedirect } from '~/utils/useAuthRedirect';
import { Container } from '../ui/Container';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { SubmitButton } from '../ui/SubmitButton';
import {
  LoginFormMutation,
  LoginFormMutationVariables
} from './__generated__/LoginForm.generated';

const loginSchema = object().shape({
  email: string()
    .email('El texto ingresado no es un correo válido.')
    .required('Ingrese el correo.'),
  password: string()
    .min(6, 'El tamaño mínimo de la contraseña es seis caracteres')
    .required('Ingrese la contraseña.')
});

export function LoginForm() {
  const authRedirect = useAuthRedirect();

  const [login, loginResult] = useMutation<
    LoginFormMutation,
    LoginFormMutationVariables
  >(
    gql`
      mutation LoginFormMutation($input: LoginInput!) {
        login(input: $input) {
          id
        }
      }
    `,
    {
      onCompleted() {
        authRedirect();
      }
    }
  );

  const form = useYupForm({ schema: loginSchema });

  async function onSubmit({ email, password }) {
    login({ variables: { input: { email, password } } });
  }

  return (
    <Container title='Iniciar Sesión'>
      <Form form={form} onSubmit={onSubmit}>
        <ErrorMessage
          title='Ocurrio un error al tratar de iniciar sesión'
          error={loginResult.error}
        />

        <Input
          {...form.register('email')}
          autoFocus
          label='Correo'
          autoComplete='email'
        />

        <Input
          {...form.register('password')}
          label='Contraseña'
          type='password'
          autoComplete='password'
        />

        <SubmitButton>Iniciar Sesión</SubmitButton>
      </Form>
    </Container>
  );
}
