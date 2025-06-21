export const TaggedError = <T extends string>(tag: T) => {
  return class TaggedError<Obj extends Record<string, unknown> | void = void> {
    readonly _tag = tag;
    data: Obj;

    constructor(data: Obj) {
      this.data = data;
    }
  }
}
