// import { provideSingleton } from '@core/decorators';
// import TYPES from '@core/constants/types.constant';
// import { di } from '@core/services/di.service';
// import { unmanaged } from 'inversify';

// @provideSingleton(TYPES.BaseService)
export class BaseService {
  public module: string;
  public action: string | null;

  // constructor(@unmanaged() module?) {
  constructor(module?: string) {
    this.module = module || 'CORE';
    this.action = null;
  }

  setAction(action: string | null) {
    this.action = action;
  }
}

// di.load();
