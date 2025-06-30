import { z } from 'zod/v4';

import { catchError } from '@zougui/firestone.error';

export function jsonSchema<T extends z.ZodType>(schema: T) {
  return z.string().transform((str, ctx): z.infer<T> => {
    if (!str) {
      return z.NEVER;
    }

    const [jsonError, data] = catchError(() => JSON.parse(str) as unknown);

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
