<template>

  <v-flex xs12 sm8 md4 lg3>
    <v-card color="secondary" class="elevation-12">
      <v-card-title>
        <span class="title primary--text primary--lighten-1 ">Login</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="person" outline name="email" label="email" type="text" v-fc="form.email" v-model="form.email.value" :error-messages="getError(form.email)"></v-text-field>
          <v-text-field id="password" prepend-icon="lock" outline name="password" label="Password" type="password" v-fc="form.password" v-model="form.password.value" :error-messages="getError(form.password)"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { required, email } from '@/modules/core/decorators/model.decorators';
import { FormGroup } from '@/modules/core/models/form-group.model';
import { BaseModel, Partial } from '@/modules/core/models/base.model';

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

  constructor() {
    super();
    this.form = null;
  }

  created() {
    this.form = this.formsService.generateFormGroup(new LoginModel());
  }
}
</script>
