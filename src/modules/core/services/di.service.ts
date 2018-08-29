import 'reflect-metadata';
import { Container, interfaces } from 'inversify';

export class DIService {
  public container: Container;

  constructor() {
    this.container = new Container();
  }

  register<T>(
    type: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>,
    constructor: new (...args: any[]) => T
  ) {
    this.container
      .bind<T>(type)
      .to(constructor)
      .inSingletonScope();
  }

  get<T>(type: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>, klass?: any): T {
    // get<T>(type: string | symbol): T {
    try {
      const t: T = this.container.get<T>(type);
      return t;
    } catch (e) {
      console.error('Error', e);
      console.error(klass, klass.toString());
      return new klass() as T;
    }
  }
}

const di = new DIService();

export { di };
