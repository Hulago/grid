export class CoreErrorModel extends Error {
  public module: string;
  public action: string;

  public message: string;
  public raw: any;

  constructor(module: string, action: string, message: string, e: any) {
    super();
    this.module = module;
    this.action = action;
    this.message = message;
    this.raw = e;
  }
}
