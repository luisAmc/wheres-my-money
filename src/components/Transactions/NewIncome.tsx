import { TransactionCategory, TransactionType } from '@prisma/client';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { FieldValues } from 'react-hook-form';
import { graphql, useMutation } from 'relay-hooks';
import { object, string } from 'yup';
import { dateShape, numberShape } from '~/utils/shapes';
import { Container } from '../shared/Container';
import { ErrorMessage } from '../shared/ErrorMessage';
import { Form, useYupForm } from '../shared/Form';
import { Input } from '../shared/Input';
import { RadioButton, RadioGroup } from '../shared/RadioButton';
import { SubmitButton } from '../shared/SubmitButton';
import { TextArea } from '../shared/TextArea';
import { NewIncomeMutation } from './__generated__/NewIncomeMutation.graphql';

const newIncomeSchema = object().shape({
  date: dateShape.required('Seleccione una fecha.'),
  amount: numberShape.required('Ingrese la cantidad.'),
  notes: string(),
  category: string()
});

export function NewIncome() {
  const router = useRouter();

  const [createIncome, { error }] = useMutation<NewIncomeMutation>(
    graphql`
      mutation NewIncomeMutation($input: NewTransactionInput!) {
        newTransaction(input: $input) {
          id
          date
          amount
          notes
          type
          category
        }
      }
    `,
    {
      onCompleted() {
        router.push('/home');
      }
    }
  );

  const form = useYupForm({
    schema: newIncomeSchema,
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd')
    }
  });

  async function onSubmit(values: FieldValues) {
    createIncome({
      variables: {
        input: {
          date: values.date,
          amount: values.amount,
          notes: values.notes,
          type: TransactionType.INCOME,
          category: values.category
        }
      }
    });
  }

  return (
    <Container href='/home' title='Nuevo Ingreso'>
      <Form form={form} onSubmit={onSubmit}>
        <ErrorMessage
          title='Ocurrio un error al tratar de crear el ingreso'
          error={error?.message}
        />

        <Input {...form.register('date')} autoFocus label='Fecha' type='date' />

        <Input {...form.register('amount')} label='Cantidad' type='number' />

        <RadioGroup label='Categoría' name='category'>
          <RadioButton
            label='Pago'
            description='Trabajo...'
            value={TransactionCategory.PAYMENT}
          />
          <RadioButton
            label='Otro'
            description='Algo no categorizado...'
            value={TransactionCategory.OTHER}
          />
        </RadioGroup>

        <TextArea {...form.register('notes')} label='Notas' />

        <SubmitButton>Crear</SubmitButton>
      </Form>
    </Container>
  );
}
