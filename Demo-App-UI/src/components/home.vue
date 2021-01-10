<template>
  <div>
    <div v-if='isAuthenticated'>
     <h1 style="text-align:center;">Welcome! {{userID}}</h1>
    </div>
    <div class="text-center">
    <h3 v-if='!isAuthenticated'>Hello! Please log in. </h3>
    </div>
  </div>
</template>

<script> 

export default {
  name: 'app',
  data () {
    return {
      isAuthenticated: false,
      userID : ''
    }
  },
 async created () {
    await this.checkAuthentication()
  
  },
  watch: {
    '$route': 'checkAuthentication'
  },
methods: {

  async checkAuthentication () {
      const accessToken = await this.$auth.getAccessToken()
      if (accessToken !== undefined) {
        const data = JSON.parse(atob(accessToken.split('.')[1]))
        this.userID = data.sub
        this.isAuthenticated = true
        }
      }
    }
}

</script>