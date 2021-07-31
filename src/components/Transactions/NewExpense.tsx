import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useMutation } from 'react-query';
import { date, number, object, string } from 'yup';
import {
  createTransaction,
  EXPENSE_CATEGORY,
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

const newExpenseSchema = object().shape({
  date: date()
    .nullable()
    .transform((current, original) => (original === '' ? null : current))
    .required('Seleccione la fecha.'),
  amount: number()
    .transform((val) => (isNaN(val) ? undefined : val))
    .min(0, 'El valor mínimo es cero.')
    .required('Ingrese la cantidad.'),
  category: string().required('Seleccione una opción'),
  notes: string()
});

export function NewExpense() {
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
  const form = useYupForm({ schema: newExpenseSchema });

  async function onSubmit(values: FieldValues) {
    createMutation.mutateAsync({
      type: TRANSACTION_TYPE.EXPENSE,
      date: values.date,
      amount: values.amount,
      category: values.category,
      notes: values.notes
    });
  }

  return (
    <>
      <PageHeader href='/transactions'>Transacciones</PageHeader>

      <Container title='Nuevo Egreso'>
        <Form form={form} onSubmit={onSubmit}>
          <ErrorMessage
            title='Ocurrio un error al tratar de crear el egreso'
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
              label='Comida'
              description='Restaurantes, compras en supermercados...'
              value={EXPENSE_CATEGORY.FOOD}
            />
            <RadioButton
              label='Entretenimiento'
              description='Subscripciones, juegos, cine...'
              value={EXPENSE_CATEGORY.ENTERTAINMENT}
            />
            <RadioButton
              label='Carro'
              description='Combustible, mantenimientos...'
              value={EXPENSE_CATEGORY.CAR}
            />
            <RadioButton
              label='Casa'
              description='Utensilios, materiales de limpieza...'
              value={EXPENSE_CATEGORY.HOME}
            />
            <RadioButton
              label='Otro'
              description='Algo no categorizado...'
              value={EXPENSE_CATEGORY.OTHER}
            />
          </RadioGroup>

          <TextArea {...form.register('notes')} label='Notas' />

          <SubmitButton>Crear</SubmitButton>
        </Form>
      </Container>
    </>
  );
}
