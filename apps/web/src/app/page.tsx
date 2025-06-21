import { cookies } from 'next/headers';

import { HydrateClient } from '~/trpc/server';

export default async function HomePage() {
  await cookies();

  return (
    <HydrateClient>
      <main className="container h-screen py-16"></main>
    </HydrateClient>
  );
}
