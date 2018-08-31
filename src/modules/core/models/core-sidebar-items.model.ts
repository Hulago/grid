import { merge } from 'lodash';
import { prop, required } from '../decorators/model.decorators';
import { BaseModel } from './base.model';
import { Partial } from '../types';
import { Location } from 'vue-router';

export class CoreSidebarItemsModel extends BaseModel {
  @required()
  public icon!: string;

  @required()
  public i18n!: string;

  @prop()
  public route!: string | Location;

  @prop()
  public roles!: string[];

  @prop()
  data?: any;

  constructor(data?: Partial<CoreSidebarItemsModel>) {
    super(data);
  }
}
