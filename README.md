# Notes
1. This single page application(SPA) is implemented using Vue.JS and BootstrapVue. 
2. The backend rest services are implemented using Node.js and express. 
3. The backend rest services are authorized using the Okta JWT verifier library.
4. The classis Okta login page is used for authentication.
5. OIDC is used for authorization.

# Data Flow:
1. User enters SPA URL.
2. Webserver returns the page and associated Javascript and CSS files.
3. Unauthenticated landing page is displayed.
4. User is redirected to the Okta login page after clicking on the login link.
5. User submits credentials.
6. After authentication is successful, Okta redirects the user back to the SPA URL.
7. An authorization call is made to Okta.
8. Okta returns the access and ID token.
9. The application determines if the token is valid and contains the claim "isAdmin".
10. The "Admin" link will be displayed in the navigation bar if the "isAdmin" claim is fulfilled.
11. The following sequence occurs when an admin performs an action:
    - A REST call will be made to the backend Node.js server. The user's access token is included in the authorization header of this call.
    - The backend server verifies the token to ensure validity and the isAdmin claim.
    - Given the above conditions, the admin operation is sent to Okta with the token inserted in the header.
