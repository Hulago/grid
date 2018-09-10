import { defaultValue } from '../decorators/model.decorators';
import { BaseModel } from './base.model';
import { Partial } from '../types';

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

  @defaultValue(null)
  windowWidth!: number;

  @defaultValue(null)
  windowHeight!: number;

  @defaultValue(false)
  mobile!: boolean;

  @defaultValue(false)
  xs!: boolean;

  @defaultValue(false)
  sm!: boolean;

  @defaultValue(false)
  md!: boolean;

  @defaultValue(false)
  lg!: boolean;

  @defaultValue(false)
  xl!: boolean;

  constructor(data?: Partial<CoreAppLayoutModel>) {
    super(data);
  }
}
