import { useId } from 'react';

import { Textarea, type TextareaProps } from '../../Textarea';

import { useFieldContext } from '../context';
import { FormLabel } from '../common/FormLabel';
import { FormDescription } from '../common/FormDescription';
import { FormMessage } from '../common/FormMessage';

export default function FormTextarea({ label, description, classes, readOnly, ...props }: FormTextareaProps) {
  const field = useFieldContext<string>();
  const inputId = useId();
  const descriptionId = useId();
  const messageId = useId();
  const hasErrors = field.state.meta.errors.length > 0;

  const getAriaDescribedBy = () => {
    const ids: string[] = [];

    if (description) {
      ids.push(descriptionId);
    }

    if (hasErrors) {
      ids.push(messageId);
    }

    return ids.join(' ');
  }

  return (
    <div className="grid gap-2">
      <FormLabel htmlFor={inputId}>{label}</FormLabel>

      <Textarea
        {...props}
        id={inputId}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        aria-invalid={hasErrors}
        aria-describedby={getAriaDescribedBy()}
        className={classes?.textarea}
        readOnly={readOnly}
      />

      {description && (
        <FormDescription id={descriptionId}>
          {description}
        </FormDescription>
      )}

      <FormMessage id={messageId} />
    </div>
  );
}

export interface FormTextareaProps extends TextareaProps {
  label: React.ReactNode;
  description?: React.ReactNode;
  classes?: {
    textarea?: string;
  };
  readOnly?: boolean;
}
