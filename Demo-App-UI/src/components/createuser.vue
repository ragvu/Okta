
<template>
  <div>
    <h1 style="text-align: center">Create User</h1>
    

    <b-form class="m-5" >
      <b-form-group
        id="input-group-1"
        label="Login:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="user.profile.login"
          type="email"
          placeholder="Enter Login"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Email address:"
        label-for="input-2"
        
      >
        <b-form-input
          id="input-2"
          v-model="user.profile.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="First Name:" label-for="input-3" >
        <b-form-input
          id="input-3"
          v-model="user.profile.firstName"
          placeholder="Enter first name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Last Name:" label-for="input-4" >
        <b-form-input
          id="input-4"
          v-model="user.profile.lastName"
          placeholder="Enter last name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Password" label-for="input-5">
        <b-form-text id="password-help-block">
          Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji.
        </b-form-text>
        <b-form-input
          id="input-5"
          type="password"
          v-model="user.credentials.password.value"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button variant="primary" v-on:click="onSubmit">Submit</b-button>
      <b-button variant="secondary" v-on:click="onReset">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import api from "../api"

export default {
  data() {
    return {
      user: {
        profile: {
          firstName: "",
          lastName: "",
          email: "",
          login: "",
        },
        credentials: {
          password: {
            value: "",
          },
        },
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      await api.createUser(this.user)
    },
    onReset(event) {
      event.preventDefault();
      this.user.profile.firstName = ""
      this.user.profile.lastName = ""
      this.user.profile.email = ""
      this.user.profile.login = ""
      this.user.credentials.password.value = ""
    },
  },
}

</script>
