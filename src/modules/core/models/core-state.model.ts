import { required, defaultValue, prop } from '../decorators/model.decorators';
import { BaseModel } from './base.model';
import { Partial } from '../types';

import { CoreLanguageModel } from './core-language.model';
import { CoreAppLayoutModel } from './core-app-layout.model';
import { CoreAuthModel } from './core-auth.model';

export class CoreStateModel extends BaseModel {
  @defaultValue(null)
  currentLanguage!: CoreLanguageModel;

  @required()
  appLayout!: CoreAppLayoutModel;

  @prop()
  auth!: CoreAuthModel;

  constructor(data?: Partial<CoreStateModel>) {
    super(data);
  }
}
