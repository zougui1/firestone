import FormButton, { type FormButtonProps } from './FormButton';
import { useFormContext } from '../context';
import { ConfirmDiscardDialog } from '../../ConfirmDiscardDialog';
import { chainHandlers } from '../../utils';

export default function FormResetButton(props: FormResetButtonProps) {
  const {
    type = 'reset',
    variant = 'outline',
    getDisabled = state => !state.isDirty,
    children = 'Discard changes',
    dialogLabel = 'changes',
    onReset,
  } = props;

  const form = useFormContext();
  const handleDiscard = chainHandlers(onReset, () => form.reset());

  return (
    <ConfirmDiscardDialog.Root label={dialogLabel} onDiscard={handleDiscard}>
      <ConfirmDiscardDialog.Trigger asChild>
        <FormButton
          type={type}
          variant={variant}
          getDisabled={getDisabled}
        >
          {children}
        </FormButton>
      </ConfirmDiscardDialog.Trigger>
    </ConfirmDiscardDialog.Root>
  );
}

export interface FormResetButtonProps extends FormButtonProps {
  dialogLabel?: string;
  onReset?: React.MouseEventHandler<HTMLButtonElement>;
}
