import { provideSingleton } from '../decorators/di.decorators';
import TYPES from '../constants/types.constant';
import { unmanaged } from 'inversify';

@provideSingleton(TYPES.BaseService)
export class BaseService {
  public module: string;
  public action: string | null;

  constructor(@unmanaged() module?: string) {
    // constructor(module?: string) {
    this.module = module || 'CORE';
    this.action = null;
  }

  setAction(action: string | null) {
    this.action = action;
  }
}
