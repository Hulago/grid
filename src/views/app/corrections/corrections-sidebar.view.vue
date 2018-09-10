<template>

  <v-list dense>
    <v-subheader v-tc="'CORRECTIONS.CORRECTIONS'"></v-subheader>
    <!-- <v-list-tile class="grey--text text--darken-1" :to="{name: 'dashboard'}" active-class="active primary--text">
      <v-list-tile-content>
        Home
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile class="grey--text text--darken-1" :to="{name: 'about'}" active-class="active primary--text">
      <v-list-tile-content>
        About
      </v-list-tile-content>
    </v-list-tile> -->
  </v-list>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Sidebar extends Vue {}
</script>
