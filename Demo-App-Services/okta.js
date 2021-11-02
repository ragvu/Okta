const okta = require('@okta/okta-sdk-nodejs');
require('dotenv').config();

token = process.env.API_KEY;

const config = {
    orgUrl: 'https://vproductions.okta.com/',
    token 
}

console.log(token);

const client = new okta.Client(config);

async function createUser(user) {
    try {
        let createdUser = await client.createUser(user);
        return createdUser;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function getUser(userId) {
    try {
        let user = await client.getUser(userId);
        return user;
    } catch (e) {
        console.log(e);
        throw e;
    }
}


async function updateUser(updatedUser) {
    try {
        let userId = updatedUser.profile.login;
        let user = await client.getUser(userId);
        user.profile.firstName = updatedUser.profile.firstName;
        user.profile.lastName = updatedUser.profile.lastName;
        user.profile.email = updatedUser.profile.email;
        return await user.update();
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function addAdmin(userId) {
    try {
        let user = await client.getUser(userId);
        return await user.addToGroup("{{GROUP ID");
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function deleteUser(userId) {
    try {
        let user = await client.getUser(userId);
        return await user.delete();
    } catch (e) {
        console.log(e);
        throw e;
    }
}

exports.getUser = getUser;
exports.updateUser = updateUser;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.addAdmin = addAdmin;
