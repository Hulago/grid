<template>

  <v-flex xs12 sm8 md4 lg3 @keyup.enter="form.$valid && login()">
    <v-card color="secondary" class="elevation-12">
      <v-card-title>
        <span class="title primary--text primary--lighten-1 ">Login</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="person" outline name="email" label="email" type="text" v-fc="form.email" v-model="form.email.value"
            :error-messages="getError(form.email)"></v-text-field>
          <v-text-field id="password" prepend-icon="lock" outline name="password" label="Password" type="password" v-fc="form.password"
            v-model="form.password.value" :error-messages="getError(form.password)"></v-text-field>
        </v-form>
        <router-link :to="{name: 'signup'}">Signup</router-link>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login()" :disabled="loading || !form.$valid">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { namespace } from 'vuex-class';

import { required, email } from '@/modules/core/decorators/model.decorators';
import { FormGroup } from '@/modules/core/models/form-group.model';
import { BaseModel } from '@/modules/core/models/base.model';
import { Partial } from '@/modules/core/types';
import CORE_ACTIONS from '@/modules/core/constants/actions.constant';
import { CoreUserModel } from '@/modules/core/models';

const core = namespace('core');

export class LoginModel extends BaseModel {
  @required()
  @email()
  email!: string;

  @required() password!: string;

  constructor(data?: Partial<LoginModel>) {
    super(data);
  }
}

@Component({})
export default class Login extends Vue {
  form: FormGroup | null;

  @core.Action(CORE_ACTIONS.LOGIN) public coreActionLogin!: (obj: any) => any;

  loading: boolean;

  constructor() {
    super();
    this.form = null;
    this.loading = false;
  }

  created() {
    this.form = this.formsService.generateFormGroup(new LoginModel());
  }

  async login() {
    this.loading = true;

    if (this.form) {
      const valid = await this.form.validateForm();
      if (valid) {
        try {
          this.$coreSetLoading(true);
          const user: CoreUserModel = await this.coreActionLogin(this.form.value);

          this.notificationService.success('LOGIN', `Welcome ${user.name}`);
          this.$router.push({ name: 'dashboard' });
        } catch (e) {
          this.notificationService.warning('LOGIN', e.message);
        }
      } else {
        this.notificationService.warning('FORM VALIDATION', 'Invalid Fields');
      }
    }

    this.loading = false;
  }
}
</script>
