import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    WAR_MACHINES_APP_PORT: z.coerce.number().positive().int(),
    WAR_MACHINES_APP_DOMAIN: z.string(),
    WAR_MACHINES_APP_URL: z.url().optional(),
    BOT_SERVICE_NAME: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    WAR_MACHINES_APP_PORT: process.env.WAR_MACHINES_APP_PORT,
    WAR_MACHINES_APP_DOMAIN: process.env.WAR_MACHINES_APP_DOMAIN,
    WAR_MACHINES_APP_URL: process.env.WAR_MACHINES_APP_URL,
    BOT_SERVICE_NAME: process.env.BOT_SERVICE_NAME,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
});
