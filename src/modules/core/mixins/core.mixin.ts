import Vue from 'vue';

import { namespace } from 'vuex-class';

import { Component } from 'vue-property-decorator';
import {
  FormsService,
  NotificationService,
  StorageService,
  DBService,
  formsService,
  notificationService,
  storageService,
  dbService
} from '../services';

import { AbstractControl } from '../models/abstract-control.model';
import { FormControl } from '../models/form-control.model';
import { CoreStateModel } from '../models/core-state.model';

import CORE_MUTATIONS from '../constants/mutations.constant';
// import CORE_GETTERS from '@core/constants/getters.constant';
// import CORE_ACTIONS from '../constants/actions.constant';
import TYPES from '../constants/types.constant';

import { capitalize } from 'lodash';

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    notificationService: NotificationService;
    storageService: StorageService;
    formsService: FormsService;
    dbService: DBService;

    $layoutMobile: boolean;
    $layoutXs: boolean;
    $layoutSm: boolean;
    $layoutMd: boolean;
    $layoutLg: boolean;
    $layoutXl: boolean;
    $layoutHeight: number;
    $layoutWidth: number;

    $layoutSetLeftDrawer: (state: boolean) => void;
    $layoutSetLeftDrawerClipped: (state: boolean) => void;
    $layoutSetLeftDrawerFloating: (state: boolean) => void;
    $layoutSetLeftDrawerMini: (state: boolean) => void;
    $layoutSetSidebarTitle: (title: string) => void;
    $layoutSetToolbarTitle: (title: string) => void;
    $layoutSetIcon: (icon: string) => void;
    $coreSetLoading: (loading: boolean) => void;

    i18n(token: string, required?: boolean, fn?: any): string;
    i18nCurrency(value: number | string, style?: string): string;
    getError(fc: AbstractControl, order?: string[]): string | string[];
  }
}

const core = namespace('core');

@Component({})
export class CoreMixin extends Vue {
  flag: boolean = false;

  notificationService: NotificationService = notificationService;

  storageService: StorageService = storageService;

  formsService: FormsService = formsService;

  dbService: DBService = dbService;

  @core.Mutation(CORE_MUTATIONS.LAYOUT.SET_LEFT_DRAWER)
  public $layoutSetLeftDrawer!: (state: boolean) => void;

  @core.Mutation(CORE_MUTATIONS.LAYOUT.SET_LEFT_DRAWER_CLIPPED)
  public $layoutSetLeftDrawerClipped!: (state: boolean) => void;

  @core.Mutation(CORE_MUTATIONS.LAYOUT.SET_LEFT_DRAWER_FLOATING)
  public $layoutSetLeftDrawerFloating!: (state: boolean) => void;

  @core.Mutation(CORE_MUTATIONS.LAYOUT.SET_LEFT_DRAWER_MINI)
  public $layoutSetLeftDrawerMini!: (state: boolean) => void;

  @core.Mutation(CORE_MUTATIONS.LAYOUT.SET_SIDEBAR_TITLE)
  public $layoutSetSidebarTitle!: (title: string) => void;

  @core.Mutation(CORE_MUTATIONS.LAYOUT.SET_TOOLBAR_TITLE)
  public $layoutSetToolbarTitle!: (title: string) => void;

  @core.Mutation(CORE_MUTATIONS.LAYOUT.SET_ICON)
  public $layoutSetIcon!: (icon: string) => void;

  @core.Mutation(CORE_MUTATIONS.SET_LOADING)
  public $coreSetLoading!: (loading: boolean) => void;

  @core.State((state: CoreStateModel) => state.appLayout.mobile)
  public $layoutMobile!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.xs)
  public $layoutXs!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.sm)
  public $layoutSm!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.md)
  public $layoutMd!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.lg)
  public $layoutLg!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.xl)
  public $layoutXl!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.windowHeight)
  public $layoutHeight!: number;

  @core.State((state: CoreStateModel) => state.appLayout.windowWidth)
  public $layoutWidth!: number;

  getError(fc: FormControl, order = ['required']) {
    for (const key of order) {
      if (fc.$errors && fc.$errors[key] !== undefined) {
        return this.$t(fc.$errors[key].i18n, fc.$errors[key]).toString();
      }
    }

    const keys = fc.$errors ? Object.keys(fc.$errors) : [];
    return fc.$errors && keys.length > 0 ? this.$t(fc.$errors[keys[0]].i18n, fc.$errors[keys[0]]).toString() : [];
  }

  i18n(token: string, required = false, fn = capitalize) {
    return fn(this.$t(token).toString() + (required ? '*' : ''));
  }

  i18nCurrency(value: number | string, style = 'euro'): string {
    return this.$n(Number(value), style);
  }
}
