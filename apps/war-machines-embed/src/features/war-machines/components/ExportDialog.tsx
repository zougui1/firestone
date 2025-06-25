import { useSelector } from '@xstate/store/react';

import { useAppForm, Dialog, Button } from '~/components/ui';

import { formSchema } from './ImportDialog';
import { gameDataStore } from '../gameData';

export const ExportDialog = ({ children }: ExportDialogProps) => {
  const state = useSelector(gameDataStore, state => state.context);

  const form = useAppForm({
    validators: {
      onSubmit: formSchema,
    },
    defaultValues: {
      data: JSON.stringify({
        warMachines: state.warMachines,
        heroes: state.crewHeroes,
        artifactTypes: state.artifactTypes,
      }),
    },
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Export data</Dialog.Title>
          <Dialog.Description>Export data as JSON</Dialog.Description>
        </Dialog.Header>

        <form.AppField
          name="data"
          children={field => <field.Textarea label="Data" classes={{ textarea: 'h-48' }} readOnly />}
        />

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Close</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export interface ExportDialogProps {
  children: React.ReactNode;
}
