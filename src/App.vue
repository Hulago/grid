<template>

  <v-app>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app class="pa-0" width="330" mini-variant-width="70"
      :mini-variant="drawerMini">
      <v-layout row fill-height>
        <!-- <core-sidebar :color="navigationColor" :items="selectedSidebarItems" :mobile="$core.layout.mobile" @selected="selectedItem($event)"
          @clickLogo="clickLogo()">
          <slot name="sidebarLogo" slot="logo"></slot>
        </core-sidebar> -->
        <div class="app-sidebar" style="width: 300px;">
          <v-subheader class="title py-5">GRID</v-subheader>
          <div class="mx-3">
            <v-divider></v-divider>
          </div>

          <router-view name="sidebar"></router-view>
        </div>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title class="mr-5">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Grid</span>
      </v-toolbar-title>
      <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>

</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => {
    return {
      drawer: true,
      drawerMini: false
    };
  }
});
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
