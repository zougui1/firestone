'use client';

import { AlertDialog } from '../AlertDialog';
import { Typography } from '../Typography';

export const UnsavedChangesDialogRoot = (props: UnsavedChangesDialogRootProps) => {
  const { children, error, onConfirm, onCancel, ...rest } = props;

  return (
    <AlertDialog.Root {...rest}>
      {children}

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Do you want to save the changes?</AlertDialog.Title>
          <AlertDialog.Description>
            You have unsaved changes, you cannot leave without saving them.
          </AlertDialog.Description>
        </AlertDialog.Header>

        {error && <Typography.P className="text-destructive">{error}</Typography.P>}

        <AlertDialog.Footer>
          <AlertDialog.Cancel onClick={onCancel}>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action onClick={onConfirm}>
            Save changes
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export interface UnsavedChangesDialogRootProps extends AlertDialog.RootProps {
  error?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
