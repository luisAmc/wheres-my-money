import { AxiosError } from 'axios';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { object, string } from 'yup';
import { login, LoginInput } from '~/resolvers/AuthResolver';
import { useAuthRedirect } from '~/utils/useAuthRedirect';
import { Container } from '../ui/Container';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { SubmitButton } from '../ui/SubmitButton';

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

  const loginMutation = useMutation((input: LoginInput) => login(input), {
    onError: (error: AxiosError) => {
      setError(error?.response?.data);
    },
    onSuccess: () => {
      authRedirect();
    }
  });

  const [error, setError] = useState('');
  const form = useYupForm({ schema: loginSchema });

  async function onSubmit(values: FieldValues) {
    loginMutation.mutateAsync({
      email: values.email,
      password: values.password
    });
  }

  return (
    <Container title='Ingresar' size='lg'>
      <Form form={form} onSubmit={onSubmit}>
        <ErrorMessage
          title='Ocurrio un error al tratar de iniciar sesión'
          error={error}
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
