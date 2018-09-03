import Vue from 'vue';

import { namespace } from 'vuex-class';

import { Component } from 'vue-property-decorator';
import { FormsService, NotificationService, StorageService, DBService } from '../services';
import { Inject } from '../decorators/di.decorators';

import { AbstractControl } from '../models/abstract-control.model';
import { FormControl } from '../models/form-control.model';

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

    $layoutSetLeftDrawer: (state: boolean) => void;
    $layoutSetLeftDrawerClipped: (state: boolean) => void;
    $layoutSetLeftDrawerFloating: (state: boolean) => void;
    $layoutSetLeftDrawerMini: (state: boolean) => void;
    $layoutSetSidebarTitle: (title: string) => void;
    $layoutSetToolbarTitle: (title: string) => void;
    $layoutSetIcon: (icon: string) => void;
    $coreSetLoading: (loading: boolean) => void;

    $layout: {
      windowWidth: number | null;
      windowHeight: number | null;
      mobile: boolean;
      xs: boolean;
      sm: boolean;
      md: boolean;
      lg: boolean;
      xl: boolean;
    };

    i18n?(token: string, required?: boolean, fn?: any): string;
    i18nCurrency(value: number | string, style?: string): string;
    getError?(fc: AbstractControl, order?: string[]): string | string[];
  }
}

const core = namespace('core');

@Component({})
export class CoreMixin extends Vue {
  flag: boolean = false;

  @Inject(TYPES.NotificationService)
  public notificationService!: NotificationService;

  @Inject(TYPES.StorageService)
  public storageService!: StorageService;

  @Inject(TYPES.FormsService)
  public formsService!: FormsService;

  @Inject(TYPES.DBService)
  public dbService!: DBService;

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
