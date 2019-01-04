<template>
  <div>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app class="pa-0" width="330"
      mini-variant-width="80" :mini-variant="drawerMini" :floating="leftDrawerFloating">
      <v-layout row fill-height>
        <core-sidebar color="#003255" :items="sidebarItems" :mobile="$layoutMobile" @clickLogo="clickLogo()">
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

    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary darken-3" dark app fixed :mini="leftDrawerMini"
      :mobile="$layoutMobile">
      <v-toolbar-title class="mr-5">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Grid</span>
      </v-toolbar-title>
      <!-- <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field> -->
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <v-btn icon slot="activator">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-list dense two-line>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile @click="logout()">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>LOGOUT</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <app-setup-modal :visibility.sync="setup"></app-setup-modal>
  </div>

</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Location } from 'vue-router';
import { CoreSidebarItemsModel, CoreStateModel } from '@/modules/core/models';
import { AcademicYearModel } from '@/modules/base/models/academic-year.model';
import { CourseModel } from '@/modules/base/models/course.model';
import CORE_ACTIONS from '@/modules/core/constants/actions.constant';
import BASE_ACTIONS from '@/modules/base/constants/actions.constant';
import BASE_TYPES from '@/modules/base/constants/types.constant';
import { gridService } from '@/modules/base/services/grid.service';
import moment from 'moment';
import { GridStateModel } from '@/modules/base/models/grid-state.model';
import { setTimeout } from 'timers';

const core = namespace('core');
const base = namespace('base');

@Component({})
export default class AppLayout extends Vue {
  @core.State((state: CoreStateModel) => state.appLayout.leftDrawer)
  public leftDrawer!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.leftDrawerClipped)
  public leftDrawerClipped!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.leftDrawerMini)
  public leftDrawerMini!: boolean;

  @core.State((state: CoreStateModel) => state.appLayout.leftDrawerFloating)
  public leftDrawerFloating!: boolean;

  @core.State((state: CoreStateModel) => state.auth.name)
  public name!: string;

  @core.State((state: CoreStateModel) => state.auth.email)
  public email!: string;

  @core.Action(CORE_ACTIONS.LOGOUT) public coreLogoutAction!: () => void;

  @base.State((state: GridStateModel) => state.courses)
  courses!: CourseModel[] | null;

  @base.Action(BASE_ACTIONS.LOAD_ENTITIES) loadEntities!: () => void;

  public sidebarItems: CoreSidebarItemsModel[];

  public setup: boolean;

  constructor() {
    super();

    this.setup = false;

    this.sidebarItems = [
      {
        icon: 'home',
        i18n: 'MENU.DASHBOARD',
        route: '/app/dashboard',
        roles: ['USER']
      },
      {
        icon: 'mdi-calendar',
        i18n: 'MENU.ACADEMIC_YEAR',
        route: '/app/academic-year',
        roles: ['USER']
      },
      {
        icon: 'mdi-school',
        i18n: 'MENU.COURSES',
        route: '/app/courses',
        roles: ['USER']
      },
      {
        icon: 'mdi-account-multiple',
        i18n: 'MENU.CLASSES',
        route: '/app/classes',
        roles: ['USER']
      },
      {
        icon: 'mdi-file-tree',
        i18n: 'MENU.EXAMS',
        route: '/app/exams',
        roles: ['USER']
      },
      {
        icon: 'mdi-grid',
        i18n: 'MENU.CORRECTIONS',
        route: '/app/corrections',
        roles: ['USER']
      }
    ];
  }

  get drawer() {
    return this.leftDrawer;
  }

  set drawer(value) {
    this.$layoutSetLeftDrawer(value);
  }

  get drawerMini() {
    return this.leftDrawerMini;
  }

  set drawerMini(value) {
    this.$layoutSetLeftDrawerMini(value);
  }

  logout() {
    this.coreLogoutAction();
    this.$router.push({ name: 'home' });
  }

  async created() {
    this.$coreSetLoading(true);

    await this.loadEntities();

    if (this.courses && this.courses.length === 0) {
      this.setup = true;
    }

    // await gridService.loadAcademicYear();
    // const courses = await gridService.loadCourses();

    // setup courses
    // dropdown ac and courses

    // create classes

    // create students

    // create exams

    // load courses
    // load students
    // load exams
    // load corrections
    // load teachers
    // if no academic-year, create one by default
    // ask for a course
    // wizards for creation of objects
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
