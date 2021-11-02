import Vue from "vue"
import Router from "vue-router"
import Home from "@/components/home"
import CreateUser from "@/components/createuser"
import ReadUser from "@/components/readuser"
import Auth from "@okta/okta-vue"


Vue.use(Auth, {
  issuer: "https://vproductions.okta.com/oauth2/default",
  client_id: "0oa2grt91eXBnFBvt5d7",
  redirect_uri: "http://localhost:8080/implicit/callback",
  pkce: true,
  scopes: ["openid", "profile", "email"]
});

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/implicit/callback",
      component: Auth.handleCallback()
    },
    { 
      path: '/logout',
      beforeEnter (to, from, next) {
        Auth.logout()
        next('/')
      }
    },
    {
      path: "/createuser",
      name: "Create User",
      component: CreateUser
    },
    {
      path: "/readuser",
      name: "Read User",
      component: ReadUser
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
