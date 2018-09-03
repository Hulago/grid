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
import { namespace } from 'vuex-class';
import { setTimeout } from 'timers';

const core = namespace('core');

@Component({})
export default class App extends Vue {
  @core.State((state: CoreStateModel) => state.loading)
  public globalLoading!: boolean;

  async created() {
    this.$coreSetLoading(true);
    await this.dbService.load('USER', CoreUserModel);
    setTimeout(() => {
      this.$coreSetLoading(false);
    }, 500);
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
    this.$layout.windowWidth = w;

    const h = document.documentElement.clientHeight;
    this.$layout.windowHeight = h;
    this.$layout.mobile = w < 1400;
    this.$layout.xs = w <= mediaQuery.xs.max;
    this.$layout.sm = w >= mediaQuery.sm.min && w <= mediaQuery.sm.max;
    this.$layout.md = w >= mediaQuery.md.min && w <= mediaQuery.md.max;
    this.$layout.lg = w >= mediaQuery.lg.min && w <= mediaQuery.lg.max;
    this.$layout.xl = w >= mediaQuery.xl.min;
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowSize as any);
  }
}
</script>
