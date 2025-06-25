import { useState } from 'react';
import { z } from 'zod';

import { useAppForm, Dialog, Button } from '~/components/ui';

import { catchError } from '~/utils';

import { artifactTypeSchema, crewHeroSchema, warMachineSchema } from '../gameData/schemas';
import { gameDataStore } from '../gameData/store';

function jsonSchema<T extends z.ZodType>(schema: T) {
  return z.string().transform((str, ctx): z.infer<T> => {
    if (!str && schema.isOptional()) {
      return;
    }

    const [jsonError, data] = catchError(() => JSON.parse(str));

    if (jsonError) {
      ctx.addIssue({ code: 'custom', message: 'Invalid data' });
      return z.NEVER
    }

    const result = schema.safeParse(data);

    if (!result.success) {
      console.log('parse error:', result.error);
      ctx.addIssue({ code: 'custom', message: 'Invalid data' });
      return z.NEVER
    }

    return result.data;
  });
}

export const formSchema = z.object({
  data: jsonSchema(z.object({
    warMachines: z.record(warMachineSchema).optional(),
    heroes: z.record(crewHeroSchema).optional(),
    artifactTypes: z.record(artifactTypeSchema).optional(),
  })),
});

export const ImportDialog = ({ children }: ImportDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useAppForm({
    validators: {
      onSubmit: formSchema,
    },
    defaultValues: {
      data: '',
    },
    onSubmit: ({ value }) => {
      gameDataStore.trigger.import(formSchema.parse(value).data);
      handleOpenChange(false);
    },
  });

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open) {
      form.reset();
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Import data</Dialog.Title>
          <Dialog.Description>Import JSON</Dialog.Description>
        </Dialog.Header>

        <form.AppField
          name="data"
          children={field => <field.Textarea label="Data" classes={{ textarea: 'h-48' }} />}
        />

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>

          <Button onClick={() => form.handleSubmit()}>Import</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export interface ImportDialogProps {
  children: React.ReactNode;
}
