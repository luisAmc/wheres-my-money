import { Container } from '../shared/Container';
import { ErrorMessage } from '../shared/ErrorMessage';
import { FieldValues } from 'react-hook-form';
import { Form, useYupForm } from '../shared/Form';
import { graphql, useMutation } from 'relay-hooks';
import { Input } from '../shared/Input';
import { object, string } from 'yup';
import { SubmitButton } from '../shared/SubmitButton';
import { useAuthRedirect } from '~/utils/useAuthRedirect';
import { LoginFormMutation } from './__generated__/LoginFormMutation.graphql';

const loginSchema = object().shape({
  username: string().trim().required('Ingrese el usuario.'),
  password: string()
    .trim()
    .min(6, 'El tamaño mínimo de la conrtaseña es seis caracteres.')
    .required('Ingrese la contraseña.')
});

export function LoginForm() {
  const authRedirect = useAuthRedirect();

  const [login, { error }] = useMutation<LoginFormMutation>(
    graphql`
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

  async function onSubmit(values: FieldValues) {
    login({
      variables: {
        input: {
          username: values.username,
          password: values.password
        }
      }
    });
  }

  return (
    <Container title='Iniciar Sesión'>
      <Form form={form} onSubmit={onSubmit}>
        <ErrorMessage
          title='Ocurrio un error al tratar de iniciar sesión'
          error={error?.message}
        />

        <Input
          {...form.register('username')}
          autoFocus
          label='Usuario'
          autoComplete='username'
        />

        <Input
          {...form.register('password')}
          label='Contraseña'
          autoComplete='password'
          type='password'
        />

        <SubmitButton>Iniciar Sesión</SubmitButton>
      </Form>
    </Container>
  );
}
