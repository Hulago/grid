<template>
  <v-layout row wrap>
    <h1 v-tc="'EXAMS.EXAMS'"></h1>
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
