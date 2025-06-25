import { cookies } from 'next/headers';

import { HydrateClient } from '~/trpc/server';
import { env } from '~/env';

export default async function HomePage() {
  await cookies();

  return (
    <HydrateClient>
      <iframe
        src={`http://localhost:${env.WAR_MACHINES_APP_PORT}`}
        className="w-screen h-screen border-none"
      />
    </HydrateClient>
  );
}
