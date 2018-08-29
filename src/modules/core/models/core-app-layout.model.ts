import { defaultValue } from '../decorators/model.decorators';
import { BaseModel, Partial } from './base.model';

export class CoreAppLayoutModel extends BaseModel {
  @defaultValue(true)
  leftDrawer!: boolean;

  @defaultValue(false)
  leftDrawerClipped!: boolean;

  @defaultValue(false)
  leftDrawerMini!: boolean;

  @defaultValue(false)
  leftDrawerFloating!: boolean;

  @defaultValue(null)
  sidebarTitle!: string;

  @defaultValue(null)
  toolbarTitle!: string;

  @defaultValue(null)
  icon!: string;

  constructor(data?: Partial<CoreAppLayoutModel>) {
    super(data);
  }
}
