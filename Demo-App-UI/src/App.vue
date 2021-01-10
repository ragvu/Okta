<template>
  <div id="app">
    <b-navbar toggleable="xl" type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item-dropdown v-if="isAdmin"
            id="admin"
            text="Admin"
          >
            <b-dropdown-item to="/createuser">Create Users</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item to="/readuser">View/Edit Users</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item  @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
          <b-nav-item @click.prevent="logout" v-else>Logout</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>

const POST_LOGOUT_REDIRECT_URI = 'http://localhost:8080/'
const ISSUER = ''

export default {
  name: 'app',
  data () {
    return {
      activeUser: null,
      isAdmin : false
    }
  },
  async created () {
  
  },
  watch: {
    '$route': 'refreshActiveUser'
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
    },
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
      await this.adminCheck()
    },
    async logout () {
      const idToken = await this.$auth.getIdToken()
      await this.$auth.logout()
      window.location.href = `${ISSUER}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${POST_LOGOUT_REDIRECT_URI}`
    },
    async adminCheck () {
      const accessToken = await this.$auth.getAccessToken();
      
      if (accessToken !== undefined) {
        const data = JSON.parse(atob(accessToken.split('.')[1]))
        console.log('DATA IS : ' + JSON.stringify(data))
        if (data.isAdmin[0] === 'Admin') {
          this.isAdmin = true
          console.log('Is admin')
        }
      }
    }
  }
}
</script>