const { response } = require('express');
const User = require('../models/user');
const user = require('../models/user');
const bcryptjs = require('bcryptjs');

const userSingleGet = async (req, res = response) => {
    const userId = req.params.userId;
    const { password, google, mail, _id, ...user } = await User.findById(userId);
    res.status(400).json({
        'ok': true,
        msg: 'Put API',
        user
    });
}

const usersGet = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const [amount, users] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true }).limit(Number(limit)).skip(from),
    ]);
    res.status(400).json({
        'ok': true,
        limit,
        from,
        amount,
        users
    });
}

const userPost = async (req, res) => {

    const { name, password, mail, role } = req.body;
    const user = new User({ name, password, mail, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        'ok': true,
        msg: 'Post API',
        user
    });
}

const userPut = async (req, res) => {
    const userId = req.params.userId;
    const { password, google, mail, _id, ...others } = req.body;

    // Validar contra base de dato
    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(userId, others);

    res.status(400).json({
        'ok': true,
        msg: 'Put API',
        "userId": userId,
        user
    });
}

const userPatch = (req, res) => {
    res.status(200).json({
        'ok': true,
        msg: 'Patch API',
    });
}

const userDelete = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, { status: false });
    res.status(200).json({
        'ok': true,
        msg: 'User deleted',
        "userId": userId,
        user
    });
}



module.exports = {
    usersGet,
    userSingleGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}