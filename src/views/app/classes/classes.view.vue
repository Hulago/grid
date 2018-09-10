<template>
  <v-layout row wrap>
    <v-flex x12>
      <h1 v-tc="'CLASSES.CLASSES'"></h1>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Dashboard extends Vue {
  created() {
    this.$coreSetLoading(false);
  }
}
</script>
