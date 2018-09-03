<template>
  <v-layout row wrap>
    <v-flex xs3>
      <v-img :src="logo" :lazy-src="logo" aspect-ratio="1" max-height="256" max-width="256">
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-layout>
      </v-img>

    </v-flex>
    <v-flex x9 class="pa-5">
      <h1>Welcome to the Grid</h1>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Dashboard extends Vue {
  logo: string;

  constructor() {
    super();
    this.logo = require('@/assets/grid.png');
  }

  created() {
    this.$coreSetLoading(false);
  }
}
</script>
