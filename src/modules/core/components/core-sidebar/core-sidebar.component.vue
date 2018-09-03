<template>

  <div class="core-sidebar" :style="style" :class="{'primary darken-4': !style}">
    <div class="core-sidebar-logo-wrapper" @click="clickLogo()">
      <slot name="logo"></slot>
    </div>

    <router-link class="core-sidebar-item py-2" :to="item.route" tag="div" @click.native="selectedItem(item)" v-for="item in items"
      :key="item.i18n" :style="activeStyle(item.route)">
      <v-icon color="white" class="mb-1">{{item.icon}}</v-icon>
      <div class="core-sidebar-item__text" v-if="!$layout.mobile || active(item.route)" v-tc="item.i18n">
        <!-- {{$t(item.i18n)}} -->
      </div>
    </router-link>
  </div>

</template>
<script lang="ts">
import Vue from 'vue';
import { Location } from 'vue-router';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { CoreSidebarItemsModel } from '../../models';

@Component({
  name: 'core-sidebar'
})
export default class CoreSidebarComponent extends Vue {
  @Prop([Array])
  public items!: CoreSidebarItemsModel[];

  @Prop() public color!: string;

  // private style: any;

  constructor() {
    super();
    // this.style = null;
  }

  created() {
    // this.style = this.color
    //   ? {
    //       backgroundColor: this.color
    //     }
    //   : null;
  }

  get style() {
    return this.color
      ? {
          backgroundColor: this.color
        }
      : null;
  }

  clickLogo() {
    this.$emit('clickLogo');
  }

  activeStyle(route: string | Location) {
    if (
      this.$router.currentRoute.name === route ||
      this.$router.currentRoute.path.match(route as string) !== null ||
      ((route as Location).path && this.$router.currentRoute.path.match((route as any).path) !== null)
    ) {
      return {
        backgroundColor: `${this.hexToRgbA(this.$vuetify.theme.primary, '0.2')}`,
        borderLeft: `3px solid ${this.$vuetify.theme.primary}`,
        borderRight: `3px solid transparent`
      };
    }
    return {
      borderLeft: `3px solid transparent`,
      borderRight: `3px solid transparent`
    };
  }

  active(route: string | Location) {
    if (
      this.$router.currentRoute.name === route ||
      this.$router.currentRoute.path.match(route as string) !== null ||
      ((route as Location).path && this.$router.currentRoute.path.match((route as any).path) !== null)
    ) {
      return true;
    }
    return false;
  }

  selectedItem(item: CoreSidebarItemsModel) {
    if (!item) {
      this.$emit('selected', null);
    } else {
      this.$emit('selected', item);
    }
  }

  private hexToRgbA(hex: any, opacity: any) {
    let c: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      // tslint:disable-next-line:no-bitwise
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
    }
    throw new Error('Bad Hex');
  }
}
</script>
<style lang="stylus">
.core-sidebar {
  width: 70px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  .core-sidebar-logo-wrapper {
    width: 100%;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
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

