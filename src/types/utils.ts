/**
 * Set all properties in T to optional, including nested properties.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Omit properties from a type. Provides type typed options to exclude.
 */
export type TypedOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Get all the keys of a union.
 */
export type KeysOfUnion<T> = T extends T ? keyof T : never;
