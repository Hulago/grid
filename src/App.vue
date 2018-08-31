<template>
  <div>
    <div v-if="loading">
      <v-progress-circular size="50" color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>

  </div>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CoreUserModel } from '@/modules/core/models';

@Component({})
export default class App extends Vue {
  public loading: boolean;

  constructor() {
    super();
    this.loading = true;
  }

  async created() {
    this.loading = true;
    await this.dbService.load('USER', CoreUserModel);
    this.loading = false;
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
