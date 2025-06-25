'use client';

import { AlertDialog } from '../AlertDialog';

export const ConfirmDiscardDialogRoot = (props: ConfirmDiscardDialogRootProps) => {
  const { label, children, onDiscard, onCancel, ...rest } = props;

  return (
    <AlertDialog.Root {...rest}>
      {children}

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you sure you want to discard the {label}?</AlertDialog.Title>
          <AlertDialog.Description>
            The {label} will be permanently discarded.
          </AlertDialog.Description>
        </AlertDialog.Header>

        <AlertDialog.Footer>
          <AlertDialog.Cancel onClick={onCancel}>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            variant="destructive"
            onClick={onDiscard}
          >
            Discard {label}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export interface ConfirmDiscardDialogRootProps extends AlertDialog.RootProps {
  label: string;
  onDiscard?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
}
