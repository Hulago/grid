import * as iziToast from 'izitoast';
import { throttle } from 'lodash';
import 'izitoast/dist/css/iziToast.min.css';

import { BaseService } from './base.service';

export interface INotificationSettings {
  timeout?: number;
  resetOnHover?: boolean;
  icon?: string;
  transitionIn?: string;
  transitionOut?: string;
  flushTimeout?: number;
}

export interface INotificationMessage {
  title: string;
  message: string;
  icon: string;
  type: string;

  module: string;
  action: string;
  detail?: any;
  createdAt: Date;
}

const NOTIFICATION_ICON = {
  INFO: 'info',
  SUCCESS: 'check',
  ERROR: 'error',
  WARNING: 'warning',
  DEBUG: 'bug_report'
};

const NOTIFICATION_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  DEBUG: 'debug'
};

export class NotificationService extends BaseService {
  private static privateModule: string;
  private static privateAction: string;

  public timeout: number;
  public flushTimeout: number;
  public resetOnHover: boolean;
  public icon: string;
  public transitionIn: string;
  public transitionOut: string;

  public process: any;

  public queue: INotificationMessage[];
  public historyQueue: INotificationMessage[];

  constructor(options: INotificationSettings = {}) {
    super('NOTIFICATION_SERVICE');
    this.timeout = options.timeout || 7000;
    this.flushTimeout = options.flushTimeout || 200;
    this.resetOnHover = options.resetOnHover ? true : false;
    this.icon = options.icon || 'material-icons';
    this.transitionIn = options.transitionIn || 'flipInX';
    this.transitionOut = options.transitionOut || 'flipOutX';

    this.queue = [];
    this.historyQueue = [];
    this.process = throttle(this.processQueue, this.flushTimeout, { leading: false });
  }

  setModule(value: string) {
    NotificationService.module = value;
  }

  setAction(value: string) {
    NotificationService.action = value;
  }

  static set module(value: string) {
    NotificationService.privateModule = value;
  }

  static get module() {
    return NotificationService.privateModule;
  }

  static set action(value: string) {
    NotificationService.privateAction = value;
  }

  static get action() {
    return NotificationService.privateAction;
  }

  info2(module: string, action: string, title: string, message: string, icon: string = NOTIFICATION_ICON.INFO) {
    this.queue.unshift({
      action,
      icon,
      message,
      module,
      title,
      type: NOTIFICATION_TYPE.INFO,
      createdAt: new Date()
    });
    this.process();
  }

  clearHistory() {
    this.historyQueue = [];
  }

  processQueue() {
    if (this.queue.length > 0) {
      const infoMessage = this.queue.filter(item => item.type === NOTIFICATION_TYPE.INFO)[0] || null;
      const successMessage = this.queue.filter(item => item.type === NOTIFICATION_TYPE.SUCCESS)[0] || null;
      const warningMessage = this.queue.filter(item => item.type === NOTIFICATION_TYPE.WARNING)[0] || null;
      const errorMessage = this.queue.filter(item => item.type === NOTIFICATION_TYPE.ERROR)[0] || null;

      if (errorMessage) {
        this.notify(NOTIFICATION_TYPE.ERROR, errorMessage.title, errorMessage.message, NOTIFICATION_ICON.ERROR);
      }

      if (warningMessage) {
        this.notify(NOTIFICATION_TYPE.WARNING, warningMessage.title, warningMessage.message, NOTIFICATION_ICON.WARNING);
      }

      if (successMessage) {
        this.notify(NOTIFICATION_TYPE.SUCCESS, successMessage.title, successMessage.message, NOTIFICATION_ICON.SUCCESS);
      }

      if (infoMessage) {
        this.notify(NOTIFICATION_TYPE.INFO, infoMessage.title, infoMessage.message, NOTIFICATION_ICON.INFO);
      }
      this.historyQueue = [...this.historyQueue, ...this.queue];
      this.queue = [];
    }
  }

  info(
    title: string,
    message: string,
    module?: string,
    action?: string,
    detail?: any,
    icon: string = NOTIFICATION_ICON.INFO
  ) {
    this.queue.unshift({
      module: module || NotificationService.module || 'CORE',
      action: action || NotificationService.action || 'LEGACY',
      title,
      message,
      icon,
      detail,
      type: NOTIFICATION_TYPE.INFO,
      createdAt: new Date()
    });
    this.process();
  }

  debug(
    title: string,
    message: string,
    module?: string,
    action?: string,
    detail?: any,
    icon: string = NOTIFICATION_ICON.DEBUG
  ) {
    this.queue.unshift({
      module: module || NotificationService.module || 'CORE',
      action: action || NotificationService.action || 'LEGACY',
      title,
      message,
      icon,
      detail,
      type: NOTIFICATION_TYPE.DEBUG,
      createdAt: new Date()
    });
    this.process();
  }

  success(
    title: string,
    message: string,
    module?: string,
    action?: string,
    detail?: any,
    icon: string = NOTIFICATION_ICON.SUCCESS
  ) {
    this.queue.unshift({
      module: module || NotificationService.module || 'CORE',
      action: action || NotificationService.action || 'LEGACY',
      title,
      message,
      icon,
      detail,
      type: NOTIFICATION_TYPE.SUCCESS,
      createdAt: new Date()
    });
    this.process();
    // this.notify('success', title, message, icon);
  }

  warning(
    title: string,
    message: string,
    module?: string,
    action?: string,
    detail?: any,
    icon: string = NOTIFICATION_ICON.WARNING
  ) {
    this.queue.unshift({
      module: module || NotificationService.module || 'CORE',
      action: action || NotificationService.action || 'LEGACY',
      title,
      message,
      icon,
      detail,
      type: NOTIFICATION_TYPE.WARNING,
      createdAt: new Date()
    });
    this.process();
  }

  error(
    title: string,
    message: string,
    module?: string,
    action?: string,
    detail?: any,
    icon: string = NOTIFICATION_ICON.ERROR
  ) {
    this.queue.unshift({
      module: module || NotificationService.module || 'CORE',
      action: action || NotificationService.action || 'LEGACY',
      title,
      message,
      icon,
      detail,
      type: NOTIFICATION_TYPE.ERROR,
      createdAt: new Date()
    });
    this.process();
  }

  notify(type: string, title: string, message: string, icon: string) {
    (iziToast as any)[type]({
      title,
      message,
      iconText: icon,
      timeout: this.timeout,
      resetOnHover: this.resetOnHover,
      icon: this.icon,
      transitionIn: this.transitionIn,
      transitionOut: this.transitionOut
    });
  }
}

export const notificationService = new NotificationService();
