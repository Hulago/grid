<template>
  <v-content class="CenterLayout">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <router-view></router-view>
      </v-layout>
    </v-container>
  </v-content>
</template>
<style lang="stylus">
.CenterLayout {
  background-image: linear-gradient(to bottom right, #7f87cf, #c0c7ec, #74b3f3) !important;
  height: 100%;
}
</style>