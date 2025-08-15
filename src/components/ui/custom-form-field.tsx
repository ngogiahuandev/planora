'use client';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// Type for select options
export type SelectOption = {
  label: string;
  value: string;
};

// Type for radio options
export type RadioOption = {
  label: string;
  value: string;
};

// Define the field types our component will support
export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'switch'
  | 'radio';

// Base props that all field types share
interface BaseFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

// Props specific to text, email, password inputs
interface TextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  type: 'text' | 'email' | 'password';
}

// Props specific to number inputs
interface NumberFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

// Props specific to textarea
interface TextareaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  type: 'textarea';
  rows?: number;
}

// Props specific to select
interface SelectFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  type: 'select';
  options: SelectOption[];
}

// Props specific to checkbox
interface CheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  type: 'checkbox';
}

// Props specific to switch
interface SwitchFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  type: 'switch';
}

// Props specific to radio
interface RadioFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends BaseFieldProps<TFieldValues, TName> {
  type: 'radio';
  options: RadioOption[];
}

// Union type of all possible field props
export type CustomFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> =
  | TextFieldProps<TFieldValues, TName>
  | NumberFieldProps<TFieldValues, TName>
  | TextareaFieldProps<TFieldValues, TName>
  | SelectFieldProps<TFieldValues, TName>
  | CheckboxFieldProps<TFieldValues, TName>
  | SwitchFieldProps<TFieldValues, TName>
  | RadioFieldProps<TFieldValues, TName>;

export function CustomFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: CustomFormFieldProps<TFieldValues, TName> & {
    formFieldClassName?: string;
  },
) {
  const {
    control,
    name,
    label,
    description,
    disabled = false,
    required = false,
    className,
    formFieldClassName,
  } = props;

  // Render the appropriate field based on the type
  const renderField = (field: FieldValues) => {
    switch (props.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <Input
            {...field}
            type={props.type}
            placeholder={props.placeholder}
            disabled={disabled}
            className={className}
          />
        );

      case 'number':
        return (
          <Input
            {...field}
            type="number"
            min={props.min}
            max={props.max}
            step={props.step}
            placeholder={props.placeholder}
            disabled={disabled}
            className={className}
            onChange={(e) => {
              const value = e.target.value === '' ? '' : Number(e.target.value);
              field.onChange(value);
            }}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...field}
            placeholder={props.placeholder}
            disabled={disabled}
            rows={props.rows}
            className={className}
          />
        );

      case 'select':
        return (
          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={className}
            />
          </FormControl>
        );

      case 'switch':
        return (
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className={className}
            />
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
              disabled={disabled}
            >
              {props.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        );

      default:
        return null;
    }
  };

  // Special layout for checkbox and switch
  const isCheckboxOrSwitch = props.type === 'checkbox' || props.type === 'switch';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            isCheckboxOrSwitch ? 'flex flex-row items-start space-y-0 space-x-3 rounded-md' : '',
            formFieldClassName,
          )}
        >
          {isCheckboxOrSwitch ? (
            <div className="flex items-center gap-2">
              {renderField(field)}
              <div className="space-y-1 leading-none">
                {label && (
                  <FormLabel className="text-sm leading-none font-medium">
                    {label}
                    {required && <span className="text-destructive">*</span>}
                  </FormLabel>
                )}
                {description && <FormDescription>{description}</FormDescription>}
              </div>
            </div>
          ) : (
            <>
              {label && (
                <FormLabel>
                  {label}
                  {required && <span className="text-destructive">*</span>}
                </FormLabel>
              )}
              <FormControl>{renderField(field)}</FormControl>
              {description && <FormDescription>{description}</FormDescription>}
            </>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
