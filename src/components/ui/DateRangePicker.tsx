import { CalendarIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { date, object, ref } from 'yup';
import { formatDate } from '~/utils/transforms';
import { Button } from './Button';
import { Form, useYupForm } from './Form';
import { Input } from './Input';
import { Modal, useModal } from './Modal';
import { SubmitButton } from './SubmitButton';

interface Props {
  onChange: (arg0: FieldValues) => void;
}

const dateRangeSchema = object().shape({
  start: date()
    .nullable()
    .transform((current, original) => (original === '' ? null : current))
    .max(ref('end'), 'La fecha inicial no puede ser despues de la final.')
    .required('Seleccione la fecha inicial.'),
  end: date()
    .nullable()
    .transform((current, original) => (original === '' ? null : current))
    .min(ref('start'), 'La fecha final no puede ser antes de la final.')
    .required('Seleccione la fecha final.')
});

export function DateRangePicker({ onChange }: Props) {
  const modal = useModal();
  const form = useYupForm({ schema: dateRangeSchema });

  const [dateRange, setDateRange] = useState({ start: null, end: null });

  function onSubmit(values: FieldValues) {
    setDateRange({ start: values.start, end: values.end });
    onChange(values);
    modal.close();
  }

  return (
    <>
      <Button variant='outlined' onClick={modal.open}>
        <div className='flex items-center justify-center space-x-4'>
          <CalendarIcon className='w-4 h-4' />

          {dateRange.start ? (
            <>
              <span className='flex items-center space-x-2'>
                <span>Desde</span>
                <span>{formatDate(dateRange.start)}</span>
              </span>
              <span> - </span>
              <span className='flex items-center space-x-2'>
                <span>Hasta</span>
                <span>{formatDate(dateRange.end)}</span>
              </span>
            </>
          ) : (
            <span>Mostrando transacciones del mes</span>
          )}
        </div>
      </Button>

      <Modal title='Seleccione el Periodo' {...modal.props}>
        {/* TODO: Use a calendar to select the range instead of the two input fields */}
        <Form form={form} onSubmit={onSubmit}>
          <div className='flex flex-col space-y-6'>
            <div className='flex flex-col space-y-6'>
              <Input
                {...form.register('start')}
                autoFocus
                label='Inicio'
                type='date'
              />

              <Input {...form.register('end')} label='Final' type='date' />
            </div>

            <div className='flex justify-end'>
              <SubmitButton>Aceptar</SubmitButton>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}
