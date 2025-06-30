import Link from 'next/link';
import { Button } from './ui';

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 flex items-center px-4 container mx-auto bg-black h-[var(--header-height)] shadow-md">
      <Link href="/">
        <Button variant="ghost">Bot</Button>
      </Link>

      <Link href="/campaign-calculator">
        <Button variant="ghost">Campaign Calculator</Button>
      </Link>
    </header>
  );
}
