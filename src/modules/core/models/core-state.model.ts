import { required, defaultValue } from '../decorators/model.decorators';
import { BaseModel, Partial } from './base.model';

import { CoreLanguageModel } from './core-language.model';
import { CoreAppLayoutModel } from './core-app-layout.model';

export class CoreStateModel extends BaseModel {
  @defaultValue(null)
  currentLanguage!: CoreLanguageModel;

  @required()
  appLayout!: CoreAppLayoutModel;

  constructor(data?: Partial<CoreStateModel>) {
    super(data);
  }
}
