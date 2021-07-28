import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { object, string } from 'yup';
import { Container } from '../ui/Container';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { SubmitButton } from '../ui/SubmitButton';
import { signUp, SignUpInput } from '~/resolvers/AuthResolver';
import { AxiosError } from 'axios';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useState } from 'react';
import { useAuthRedirect } from '~/utils/useAuthRedirect';

const signUpSchema = object().shape({
  name: string().required('Ingrese el nombre.'),
  email: string()
    .email('El texto ingresado no es un correo válido.')
    .required('Ingrese el correo.'),
  password: string()
    .min(6, 'El tamaño mínimo de la contraseña es seis caracteres')
    .required('Ingrese la contraseña.'),
  confirmPassword: string().test(
    'does-password-match',
    'Las contraseñas no coinciden.',
    function (value) {
      return this.parent.password === value;
    }
  )
});

export function SignUpForm() {
  const authRedirect = useAuthRedirect();

  const signUpMutation = useMutation((input: SignUpInput) => signUp(input), {
    onError: (error: AxiosError) => {
      setError(error?.response?.data);
    },
    onSuccess: () => {
      authRedirect();
    }
  });

  const [error, setError] = useState('');
  const form = useYupForm({ schema: signUpSchema });

  async function onSubmit(values: FieldValues) {
    signUpMutation.mutateAsync({
      name: values.name,
      email: values.email,
      password: values.password
    });
  }

  return (
    <Container title='Crear Usuario' size='lg'>
      <Form form={form} onSubmit={onSubmit}>
        <ErrorMessage
          title='Ocurrio un error al tratar de crear el usuario'
          error={error}
        />

        <Input
          {...form.register('name')}
          autoFocus
          label='Nombre'
          autoComplete='name'
        />

        <Input
          {...form.register('email')}
          label='Correo'
          autoComplete='email'
        />

        <Input
          {...form.register('password')}
          label='Contraseña'
          autoComplete='password'
          type='password'
        />

        <Input
          {...form.register('confirmPassword')}
          label='Confirmar Contraseña'
          autoComplete='confirmPassword'
          type='password'
        />

        <SubmitButton>Crear Usuario</SubmitButton>
      </Form>
    </Container>
  );
}
