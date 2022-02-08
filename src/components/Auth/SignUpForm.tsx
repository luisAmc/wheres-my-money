import { FieldValues } from 'react-hook-form';
import { object, string } from 'yup';
import { Container } from '../shared/Container';
import { Form, useYupForm } from '../shared/Form';
import { Input } from '../shared/Input';
import { SubmitButton } from '../shared/SubmitButton';
import { ErrorMessage } from '../shared/ErrorMessage';
import { useAuthRedirect } from '~/utils/useAuthRedirect';
import { graphql, useMutation } from 'relay-hooks';
import { SignUpFormMutation } from './__generated__/SignUpFormMutation.graphql';

const signUpSchema = object().shape({
  username: string().trim().required('Ingrese el nombre de usuario.'),
  password: string()
    .trim()
    .min(6, 'El tamaño mínimo de la conrtaseña es seis caracteres.')
    .required('Ingrese la contraseña.'),
  confirmPassword: string()
    .trim()
    .test(
      'does-password-match',
      'Las contraseñas no coinciden.',
      function (value) {
        return this.parent.password === value;
      }
    )
});

export function SignUpForm() {
  const authRedirect = useAuthRedirect();

  const [signUp, { error }] = useMutation<SignUpFormMutation>(
    graphql`
      mutation SignUpFormMutation($input: SignUpInput!) {
        signUp(input: $input) {
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

  const form = useYupForm({ schema: signUpSchema });

  async function onSubmit(values: FieldValues) {
    signUp({
      variables: {
        input: {
          username: values.username,
          password: values.password
        }
      }
    });
  }

  return (
    <Container title='Crear Usuario'>
      <Form form={form} onSubmit={onSubmit}>
        <ErrorMessage
          title='Ocurrio un error al tratar de crear el usuario'
          error={error?.message}
        />

        <Input
          {...form.register('username')}
          label='Usuario'
          autoComplete='username'
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
