<template>

  <v-flex xs12 sm8 md4 lg3>
    <v-card color="secondary" class="elevation-12">
      <v-card-title>
        <span class="title primary--text primary--lighten-1 ">Signup</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="person" browser-autocomplete="off" name="email" outline v-fc="form.email" v-model="form.email.value"
            label="email *" type="text" :error-messages="getError(form.email)"></v-text-field>
          <v-text-field prepend-icon="person" outline v-fc="form.name" v-model="form.name.value" label="name *" type="text" :error-messages="getError(form.name)"></v-text-field>
          <v-text-field prepend-icon="lock" outline v-fc="form.password" v-model="form.password.value" label="Password *" type="password"
            :error-messages="getError(form.password)"></v-text-field>
          <v-text-field prepend-icon="lock" outline v-fc="form.confirmPassword" v-model="form.confirmPassword.value" label="Confirm Password *"
            type="password" :error-messages="getError(form.confirmPassword)"></v-text-field>
        </v-form>
        <router-link :to="{name: 'login'}">Login</router-link>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="signup()" :disabled="loading || !form.$valid">Signup</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { required, email } from '@/modules/core/decorators/model.decorators';
import { FormGroup } from '@/modules/core/models/form-group.model';
import { BaseModel } from '@/modules/core/models/base.model';
import { Partial } from '@/modules/core/types';

import { namespace } from 'vuex-class';

import STORAGE from '@/constants/storage.constant';
import CORE_ACTIONS from '@/modules/core/constants/actions.constant';
import { TeacherModel } from '@/modules/base/models/teacher.model';
import { CoreStateModel } from '@/modules/core/models/core-state.model';

const core = namespace('core');

export class SignupModel extends BaseModel {
  @required()
  @email()
  email!: string;

  @required() name!: string;

  @required() password!: string;

  @required() confirmPassword!: string;

  constructor(data?: Partial<SignupModel>) {
    super(data);
  }
}

@Component({})
export default class Signup extends Vue {
  form: FormGroup | null;

  loading: boolean;

  @core.Action(CORE_ACTIONS.SIGNUP) public coreActionSignup!: (obj: any) => any;

  constructor() {
    super();
    this.form = null;
    this.loading = false;
  }

  created() {
    this.form = this.formsService.generateFormGroup(new SignupModel());
  }

  async signup() {
    this.loading = true;

    if (this.form) {
      const valid = await this.form.validateForm();
      if (valid) {
        try {
          await this.coreActionSignup(this.form.value);

          this.notificationService.success('SIGNUP', `Welcome ${(this.form as any).$controls['name'].value}`);
          this.$router.push({ name: 'dashboard' });
        } catch (e) {
          this.notificationService.warning('SIGNUP', e.message);
        }
      } else {
        this.notificationService.warning('FORM VALIDATION', 'Invalid Fields');
      }
    }
  }
}
</script>
