import { di } from '../services/di.service';
import getDecorators from 'inversify-inject-decorators';
import { injectable, interfaces } from 'inversify';
import { makeFluentProvideDecorator } from 'inversify-binding-decorators';

const { lazyInject } = getDecorators(di.container);

const provider = makeFluentProvideDecorator(di.container);

const provide = (identifier: any) => {
  return provider(identifier).done();
};

const provideSingleton = (identifier: any) => {
  if (process.env.NODE_ENV && ['development'].indexOf(process.env.NODE_ENV) !== -1) {
    console.debug('provideSingleton', identifier);
  }

  return provider(identifier)
    .inSingletonScope()
    .done(true);
};

export { interfaces, injectable as Service, lazyInject as Inject, provideSingleton, provide };
