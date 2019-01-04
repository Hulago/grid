export class BaseService {
  public module: string;
  public action: string | null;

  constructor(module: string = 'CORE') {
    // constructor(module?: string) {
    this.module = module;
    this.action = null;
  }

  setAction(action: string | null) {
    this.action = action;
  }
}
