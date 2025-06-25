import { isNumber } from 'radash';

export const handleNumberInputChange = (onChange: (value?: number) => void) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);

    if (!event.currentTarget.value) {
      onChange();
    } else if (isNumber(value)) {
      onChange(value);
    }
  }
}
