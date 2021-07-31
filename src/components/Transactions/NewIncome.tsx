import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { date, number, object, string } from 'yup';
import {
  createTransaction,
  INCOME_CATEGORY,
  TransactionInput,
  TRANSACTION_TYPE
} from '~/resolvers/TransactionResolver';
import { Container } from '../ui/Container';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Form, useYupForm } from '../ui/Form';
import { Input } from '../ui/Input';
import { PageHeader } from '../ui/PageHeader';
import { RadioButton, RadioGroup } from '../ui/RadioButton';
import { SubmitButton } from '../ui/SubmitButton';
import { TextArea } from '../ui/TextArea';

const newIncomeSchema = object().shape({
  date: date()
    .nullable()
    .transform((current, original) => (original === '' ? null : current))
    .required('Seleccione una fecha.'),
  amount: number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .required('Ingrese la cantidad.'),
  notes: string()
});

export function NewIncome() {
  const router = useRouter();

  const createMutation = useMutation(
    (input: TransactionInput) => createTransaction(input),
    {
      onError: (error: AxiosError) => {
        setError(error?.response?.data);
      },
      onSuccess: () => {
        router.push('/transactions');
      }
    }
  );

  const [error, setError] = useState('');
  const form = useYupForm({ schema: newIncomeSchema });

  async function onSubmit(values: FieldValues) {
    createMutation.mutateAsync({
      type: TRANSACTION_TYPE.INCOME,
      date: values.date,
      amount: values.amount,
      category: values.category,
      notes: values.notes
    });
  }

  return (
    <>
      <PageHeader href='/transactions'>Transacciones</PageHeader>

      <Container title='Nuevo Ingreso'>
        <Form form={form} onSubmit={onSubmit}>
          <ErrorMessage
            title='Ocurrio un error al tratar de crear el ingreso'
            error={error}
          />

          <Input
            {...form.register('date')}
            autoFocus
            label='Fecha'
            type='date'
          />

          <Input {...form.register('amount')} label='Cantidad' type='number' />

          <RadioGroup label='Categoría' name='category'>
            <RadioButton
              label='Pago'
              description='Trabajo...'
              value={INCOME_CATEGORY.PAYMENT}
            />
            <RadioButton
              label='Otro'
              description='Algo no categorizado...'
              value={INCOME_CATEGORY.OTHER}
            />
          </RadioGroup>

          <TextArea {...form.register('notes')} label='Notas' />

          <SubmitButton>Crear</SubmitButton>
        </Form>
      </Container>
    </>
  );
}
