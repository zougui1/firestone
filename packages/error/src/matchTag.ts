export const matchTag = <
  T,
  E extends { _tag: string; data: Record<string, unknown> | void; },
  Tag extends E['_tag'] = E['_tag'],
>(
  error: E,
  matches: {
    [K in Tag]: (data: Extract<E, { _tag: K }>['data']) => T;
  },
): T => {
  const handler = matches[error._tag as Tag];
  return handler(error.data);
}
