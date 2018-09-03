<template>
  <v-dialog v-model="showLoading" fullscreen transition="dialog-bottom-transition">
    <v-layout row wrap full-width fill-height align-center>
      <v-flex xs12 text-xs-center>
        <v-progress-circular size="50" color="primary" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'core-global-loading'
})
export default class CoreGlobalLoading extends Vue {
  @Prop({ default: false })
  loading!: boolean;

  public showLoading: boolean;

  constructor() {
    super();
    this.showLoading = this.loading;
  }

  @Watch('loading')
  onLoadingChange(val: boolean) {
    this.showLoading = val;
  }
}
</script>
