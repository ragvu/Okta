<template>
  <div>
    
    <div class="m-5" v-if="!this.submitted">
      <h1 style="text-align:center;">Get User</h1>
      <b-form-input  v-model="input" placeholder="Enter a login"></b-form-input>
  </div>
  <div v-if="!this.update">
  <div v-if="this.submitted">
    <b-col>
        <table class="table" v-if="loaded">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              <td>{{ user.profile.login }}</td>
              <td>{{ user.profile.lastName }}</td>
              <td>{{ user.profile.firstName }}</td>
              <td>{{ user.profile.email }}</td>
              <td>{{ user.status }}</td>
              <b-button variant="secondary" v-on:click="addAdmin">Make Admin</b-button>
              <b-button variant="info" v-on:click="toggleUpdate">Update</b-button>
              <b-button variant="danger" v-on:click="deleteUser">Delete</b-button>
              <td class="text-right">
              </td>
          </tbody> 
        </table>
        <div class="text-center">
        <b-button variant="success" v-on:click="backToSearch">Back to Search</b-button>
        </div>
      </b-col>

  </div>
  </div>
  <div class="text-center" v-if="!this.submitted">
        <b-button  size = "lg" class = "center" variant="primary" v-on:click="getUser" >Submit</b-button>
  </div>
  <div v-if="update">
  <div v-if="loaded">
    <h1 style="text-align: center">Update User</h1>
    <b-form class="m-5">
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
      <div class="text-center">
      <b-button variant="primary" class="mr-5" v-on:click="updateUser">Update</b-button>
      <b-button variant="primary" v-on:click="backToSearch">Back to Search</b-button>
      </div>
    </b-form>

      
  </div>
  </div>

  </div>
</template>

<script>
import api from "../api";

  export default {
    data() {
      return {
        loaded:false,
        submitted:false,
        update:false,
        user: {},
        input : '',
        error: false,
        errorData: {}
      }
    },
    methods: { 
      async getUser (event) {
        this.error = false;
        this.errorData = {};
        this.submitted=!this.submitted;
        event.preventDefault();
        let resp = await api.getUser(this.input);
        if (this.isSuccess(resp)) {
          this.user = resp;
        } 
        this.loaded = true;
        
      },
      async deleteUser(event) {
        event.preventDefault();
        let resp = await api.deleteUser(this.input);
        if (this.isSuccess(resp)) {
          alert ("User delete operation is successful");
          this.user = await api.getUser(this.input);
        } 
      },
      async updateUser(event) {
        event.preventDefault()
        let resp = await api.updateUser(this.input, this.user);
        if (this.isSuccess(resp)) {
          alert ("User update operation is successful");
        } 
      },
      async addAdmin(event) {
        event.preventDefault()
        let resp = await api.addAdmin(this.input);
        if (this.isSuccess(resp)) {
          alert ("User group update operation is successful");
        } 
      },
      toggleUpdate() {
        this.update=!this.update
      },
      backToSearch() {
        this.submitted=!this.submitted;
        this.update=false;
      },
      isSuccess(resp) {
        if (resp && !resp.error) {
          return true;
        }
        else {
          alert ('Error : ' + resp.data);
          return false;
        }
      }
    }
  }
 
</script>