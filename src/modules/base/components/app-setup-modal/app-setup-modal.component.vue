<template>
  <v-dialog v-model="selectedVisibility" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-card-title class="headline py-2 px-3" style="max-height: 64px">
        <v-layout row wrap style="width:100%; font-weight: 500">
          <v-flex xs10 style="display:flex; align-items:center">
            <h1>Setup</h1>
          </v-flex>
          <v-flex xs2 class="text-xs-right">
            <v-btn icon @click.native="selectedVisibility = false;">
              <v-icon class="grey--text text--darken-1">close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-divider style="max-height: 1px"></v-divider>
      <v-card-text style="margin-bottom: 52px;">
        <h1>Content</h1>
      </v-card-text>
      <v-card-actions style="background-color: #f6f6f6;max-height: 64px;position: absolute;width: 100%;bottom: 0; z-index: 99; border-top: 1px solid rgba(0,0,0,.12);">
        <v-spacer></v-spacer>
        <v-btn color="success" class="ml-2" @click="selectedVisibility = false">{{$t('ACTIONS.CLOSE')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'app-setup-modal'
})
export default class AppSetupModal extends Vue {
  @Prop({ default: false })
  public visibility!: boolean;

  @Prop({ default: false })
  public loading!: boolean;

  constructor() {
    super();
  }

  get selectedVisibility() {
    return this.visibility;
  }

  set selectedVisibility(value) {
    this.$emit('update:visibility', value);
  }
}
</script>
