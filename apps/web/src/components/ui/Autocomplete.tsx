'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from './utils';
import { Button } from './Button';
import { Command } from './Command';
import { Popover } from './Popover';

export const Autocomplete = (props: AutocompleteProps) => {
  const {
    options,
    label,
    value,
    onValueChange,
    width = '200px',
  } = props;

  const [open, setOpen] = useState(false);

  const optionObjects = options.map(option => {
    return typeof option === 'string'
      ? { value: option, label: option }
      : option;
  });

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          style={{ width }}
          className="justify-between"
        >
          {value
            ? optionObjects.find((option) => option.value === value)?.label
            : `Select ${label}`
          }
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content style={{ width }} className="p-0">
        <Command.Root>
          <Command.Input placeholder={`Search ${label}...`} className="h-9" />
          <Command.List>
            <Command.Empty>No {label} found.</Command.Empty>
            <Command.Group>
              {optionObjects.map((option) => (
                <Command.Item
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command.Root>
      </Popover.Content>
    </Popover.Root>
  );
}

export interface AutocompleteProps {
  options: (string | { value: string; label: string; })[];
  label: string;
  value: string;
  onValueChange?: (value: string) => void;
  width?: string;
}
