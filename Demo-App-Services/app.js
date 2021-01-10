const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const OktaJwtVerifier = require('@okta/jwt-verifier')
const okta = require('./okta')

let app = express()
app.use(cors())
app.use(bodyParser.json())


//credentials 
const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: '{{CLIENT ID}}',
    issuer: 'https://{{OKTA ORG}}/oauth2/default',
    audience: '{{AUDIENCE}}'
})

// Verify JWT token middleware
app.use((req, res, next) => {
    if (!req.headers.authorization) {
        return next(new Error('Authorization header is required'))
    }
    let parts = req.headers.authorization.trim().split(' ')
    let accessToken = parts.pop()
    oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default')
        .then(jwt => {
            req.user = {
                uid: jwt.claims.uid,
                email: jwt.claims.sub,
                admin: jwt.claims.isAdmin
            }
            next()
        })
        .catch(err => {
            console.log(err);
            res.send(401).send(err);
          }); 
})

app.get('/api/v1/user/:userId', (req, res) => {
    try {
        if (req.user.admin !== undefined && req.user.admin[0] === 'Admin') {
            let user = okta.getUser(req.params.userId);
            user.then(u => {
                res.send(u);
            }).catch(err => {
                res.status(500).send(err);
            });
        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

app.put('/api/v1/user/:userId', (req, res) => {
    try {
        if (req.user.admin !== undefined && req.user.admin[0] === 'Admin') {
            let user = okta.updateUser(req.body);
            user.then(u => {
                res.send(u);
            }).catch(err => {
                res.status(500).send(err);
            });
        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

app.post('/api/v1/user/', (req, res) => {
    try {
        if (req.user.admin !== undefined && req.user.admin[0] === 'Admin') {
            let user = okta.createUser(req.body);
            user.then(u => {
                res.send(u);
            }).catch(err => {
                res.status(500).send(err);
            });
        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

app.delete('/api/v1/user/:userId', (req, res) => {
    try {
        if (req.user.admin !== undefined && req.user.admin[0] === 'Admin') {
            let user = okta.deleteUser(req.params.userId);
            user.then(u => {
                res.send(u);
            }).catch(err => {
                res.status(500).send(err);
            });
        } else {
            res.sendStatus(401)
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

app.get('/api/v1/user/addToAdminGroup/:userId', (req, res) => {
    try {
        if (req.user.admin !== undefined && req.user.admin === 'Admin') {
            let user = okta.addAdmin(req.params.userId);
            user.then(u => {
                res.send(u);
            }).catch(err => {
                res.status(500).send(err);
            });
        } else {
            res.sendStatus(401)
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})
module.exports = app