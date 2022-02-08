import { RadioGroup as HRadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FieldError } from './Form';

export function RadioGroup({ label, name, children }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ControlledRadioGroup name={name} label={label} {...field}>
          {children}
        </ControlledRadioGroup>
      )}
    />
  );
}

type ControlledRadioGroup = {
  label: string;
  children: ReactNode;
  submitted?: boolean;
  value: any;
  name: string;
  onChange(arg0: any): void;
};

const ControlledRadioGroup = forwardRef(
  (
    { label, children, submitted = false, ...props }: ControlledRadioGroup,
    ref
  ) => {
    const {
      formState: { isSubmitting }
    } = useFormContext();

    function onChange(value: any) {
      if (!submitted || !isSubmitting) {
        props.onChange(value);
      }
    }

    return (
      <label>
        <div className='font-medium text-gray-800 dark:text-gray-200 mb-1'>
          {label}
        </div>
        <HRadioGroup value={props.value} onChange={(value) => onChange(value)}>
          <div className='bg-white rounded-md -space-y-px'>{children}</div>
        </HRadioGroup>

        <FieldError name={props.name} />
      </label>
    );
  }
);

type RadioButtonProps = {
  label: string;
  description?: string;
  value: any;
};

export function RadioButton({ label, value, description }: RadioButtonProps) {
  return (
    <HRadioGroup.Option
      value={value}
      className={({ checked }) =>
        clsx(
          checked ? 'bg-brand-50 border-brand-200 z-10' : 'border-gray-200',
          'relative border p-4 flex cursor-pointer focus:outline-none first:rounded-t-md last:rounded-b-md'
        )
      }
    >
      {({ active, checked }) => (
        <>
          <span
            className={clsx(
              checked
                ? 'bg-brand-600 border-transparent'
                : 'bg-white border-gray-300',
              active ? 'ring-2 ring-offset-2 ring-brand-600' : '',
              'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
            )}
            aria-hidden='true'
          >
            <span className='rounded-full bg-white w-1.5 h-1.5' />
          </span>
          <div className='ml-3 flex flex-col'>
            <HRadioGroup.Label
              as='span'
              className={clsx(
                checked ? 'text-brand-900' : 'text-gray-900',
                'block text-sm font-medium'
              )}
            >
              {label}
            </HRadioGroup.Label>

            {description && (
              <HRadioGroup.Description
                as='span'
                className={clsx(
                  checked ? 'text-brand-700' : 'text-gray-500',
                  'block text-sm'
                )}
              >
                {description}
              </HRadioGroup.Description>
            )}
          </div>
        </>
      )}
    </HRadioGroup.Option>
  );
}
