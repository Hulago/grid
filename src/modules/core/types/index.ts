export type AnyFunction = (...args: any[]) => any;
export type klass<T> = (new (...args: any[]) => T) | AnyFunction;

export type Partial<T> = { [P in keyof T]?: T[P] };
