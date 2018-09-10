<template>
  <v-layout row wrap>
    <h1 v-tc="'COURSES.COURSES'"></h1>
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
