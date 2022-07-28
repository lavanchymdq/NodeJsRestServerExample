const Role = require('../models/role');
const user = require('../models/user');

const isValidRole = async (role = '') => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`The role ${role} is not registered in DB`);
    }
}

const existsMail = async (mail = '') => {
    // Verify if mail exists
    const existsMail = await user.findOne({ mail });
    if (existsMail) {
        throw new Error(`The mail ${mail} already exist`)
    }
}

const existsUserById = async (id = '') => {
    // Verify if mail exists
    const existsUser = await user.findById(id);
    if (!existsUser) {
        throw new Error(`The user with id ${id} not exist`)
    }
}

module.exports = { isValidRole, existsMail, existsUserById };