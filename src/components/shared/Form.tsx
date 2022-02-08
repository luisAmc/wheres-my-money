import { ComponentProps } from 'react';
import {
  useForm,
  UseFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

interface UseYupFormProps extends UseFormProps {
  schema: AnyObjectSchema;
}

export const useYupForm = ({ schema, ...formConfig }: UseYupFormProps) => {
  return useForm({
    ...formConfig,
    resolver: yupResolver(schema)
  });
};

interface FieldErrorProps {
  name?: string;
}

export function FieldError({ name }: FieldErrorProps) {
  const {
    formState: { errors }
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;

  return <div className='text-sm text-red-500 font-bold'>{error.message}</div>;
}

interface Props<T extends FieldValues = any>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  submitted?: boolean;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  submitted = false,
  ...props
}: Props<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset
          className='flex flex-col space-y-4'
          disabled={form.formState.isSubmitting || submitted}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
