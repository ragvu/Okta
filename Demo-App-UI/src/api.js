import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    json: true
})

export default {
    async execute(method, resource, data) {
        let accessToken = await Vue.prototype.$auth.getAccessToken()
        return client({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(req => {
            return req.data;
        })
        .catch (err => {
            return {
                data: err,
                error: true
            }
        })
    },
    getUsers() {
        return this.execute('get', '/user')
    },
    getUser(id) {
        return this.execute('get', '/user/' + id)
    },
    createUser(data) {
        return this.execute('post', '/user', data)
    },
    updateUser(id, data) {
        return this.execute('put', '/user/' + id, data)
    },
    deleteUser(id) {
        return this.execute('delete', '/user/' + id)
    },
    addAdmin(id) {
        return this.execute('get', '/user/addToAdminGroup/'+ id)
    }
}