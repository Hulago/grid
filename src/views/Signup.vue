<template>

  <v-flex xs12 sm8 md4 lg3>
    <v-card color="secondary" class="elevation-12">
      <v-card-title>
        <span class="title primary--text primary--lighten-1 ">Signup</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="person" outline name="email" label="email *" type="text"></v-text-field>
          <v-text-field prepend-icon="person" outline name="email" label="name *" type="text"></v-text-field>
          <v-text-field prepend-icon="lock" outline name="password" label="Password *" type="password"></v-text-field>
          <v-text-field prepend-icon="lock" outline name="confirmPassword" label="Confirm Password *" type="password"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary">Signup</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Signup extends Vue {}
</script>
