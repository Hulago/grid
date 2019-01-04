<template>
  <div>
    <v-app>
      <core-global-loading :loading="globalLoading"></core-global-loading>
      <router-view></router-view>
    </v-app>

  </div>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CoreUserModel, CoreStateModel } from '@/modules/core/models';

import CORE_MUTATIONS from '@/modules/core/constants/mutations.constant';

import { namespace } from 'vuex-class';

const core = namespace('core');

@Component({})
export default class App extends Vue {
  @core.State((state: CoreStateModel) => state.loading)
  globalLoading!: boolean;

  @core.Mutation(CORE_MUTATIONS.LAYOUT.SET_LAYOUT) public setLayout!: (
    layout: any
  ) => void;

  async created() {
    this.$coreSetLoading(true);
    await this.dbService.load<CoreUserModel>('USER');
    this.$nextTick(() => {
      this.$coreSetLoading(false);
    });
  }

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowSize as any);
      this.getWindowSize();
    });
  }

  getWindowSize(event = null) {
    // vuetify mediaQuery
    const mediaQuery = {
      xs: {
        max: 599
      },
      sm: {
        min: 600,
        max: 1023
      },
      md: {
        min: 1024,
        max: 1439
      },
      lg: {
        min: 1440,
        max: 1919
      },
      xl: {
        min: 1920
      }
    };

    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;
    const layout = {
      windowWidth: w,
      windowHeight: h,
      mobile: w < 1400,
      xs: w <= mediaQuery.xs.max,
      sm: w >= mediaQuery.sm.min && w <= mediaQuery.sm.max,
      md: w >= mediaQuery.md.min && w <= mediaQuery.md.max,
      lg: w >= mediaQuery.lg.min && w <= mediaQuery.lg.max,
      xl: w >= mediaQuery.xl.min
    };
    this.$nextTick(() => {
      this.setLayout(layout);
    });
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowSize as any);
  }
}
</script>
