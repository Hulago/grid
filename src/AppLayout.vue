<template>
  <v-app>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app class="pa-0" width="330" mini-variant-width="70"
      :mini-variant="drawerMini">
      <v-layout row fill-height>
        <core-sidebar color="#003255" :items="sidebarItems" :mobile="false" @selected="selectedItem($event)" @clickLogo="clickLogo()">
          <slot name="sidebarLogo" slot="logo"></slot>
        </core-sidebar>
        <div class="app-sidebar" style="width: 300px;">
          <v-subheader class="title py-5">GRID</v-subheader>
          <div class="mx-3">
            <v-divider></v-divider>
          </div>

          <router-view name="sidebar"></router-view>
        </div>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary darken-3" dark app fixed>
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
import { Component, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';
import { CoreSidebarItemsModel } from '@/modules/core/models';

@Component({})
export default class AppLayout extends Vue {
  drawer: boolean;
  drawerMini: boolean;

  // public leftDrawer: boolean;
  // public leftDrawerClipped: boolean;
  // public leftDrawerMini: boolean;
  // public leftDrawerFloating: boolean;

  public sidebarItems: CoreSidebarItemsModel[];

  constructor() {
    super();
    this.drawer = true;
    this.drawerMini = false;

    this.sidebarItems = [
      {
        icon: 'mdi-widgets',
        i18n: 'MENU.COMPONENTS',
        route: '/app',
        roles: ['IM_USER']
      },
      {
        icon: 'mdi-brush',
        i18n: 'MENU.THEMES',
        route: '/app/themes',
        roles: ['IM_USER']
      },
      {
        icon: 'mdi-floor-plan',
        i18n: 'MENU.LAYOUTS',
        route: '/app/layouts',
        roles: ['IM_USER']
      },
      {
        icon: 'mdi-pencil',
        i18n: 'MENU.CRUD',
        route: '/app/crud',
        roles: ['IM_USER']
      },
      {
        icon: 'mdi-file-document',
        i18n: 'MENU.DOCUMENTATION',
        route: '/app/docs',
        roles: ['IM_USER']
      },
      {
        icon: 'sentiment_dissatisfied',
        i18n: 'MENU.404',
        route: '/app/pages',
        roles: ['IM_USER']
      },
      {
        icon: 'child_care',
        i18n: 'MENU.TEST',
        route: '/app/play',
        roles: ['IM_USER']
      }
    ];
  }

  // async created() {

  //   const teatchers: TeacherModel[] = await this.dbService.get('TEACHER').find();

  //   if (!teatchers || teatchers.length === 0) {
  //     this.$router.push({ name: 'signup' });
  //   } else {
  //     if (teatchers && this.authenticated) {
  //       this.$router.push({ name: 'home' });
  //     } else {
  //       this.$router.push({ name: 'login' });
  //     }
  //   }
  // }
}
</script>

<style lang="stylus">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .core-sidebar-item {
    width: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    i {
      line-height: 34px;
    }

    &:hover:not(.active) {
      i {
        font-size: 30px;
        color: lighten($primary, 30) !important;
        transition: font-size 0.1s;
      }

      .core-sidebar-item__text {
        // color: lighten(#ad0206, 30) !important;
      }
    }

    &__text {
      text-align: center;
      font-size: 10px;
      line-height: 12px;
      color: white;
    }
  }
}
</style>
