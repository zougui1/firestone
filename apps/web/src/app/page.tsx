import { cookies } from 'next/headers';

import { BotConfig } from '~/features/bot/components/BotConfig';
import { HydrateClient } from '~/trpc/server';

export default async function HomePage() {
  await cookies();

  return (
    <HydrateClient>
      <main className="container mx-auto p-4">
        <BotConfig />
      </main>
    </HydrateClient>
  );
}
