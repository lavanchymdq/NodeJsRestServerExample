const { response } = require('express');

const usersGet = (req, res = response) => {
    const queryParams = req.query;

    res.status(200).json({
        'ok': true,
        msg: 'get API from controller',
        queryParams
    });
}

const userPost = (req, res) => {

    const {name,age} = req.body;

    res.status(200).json({
        'ok': true,
        msg: 'Post API',
        name, 
        age,
    });
}

const userPut = (req, res) => {
const userId=  req.params.userId;

    res.status(400).json({
        'ok': true,
        msg: 'Put API',
        "userId":userId
    });
}

const userPatch = (req, res) => {
    res.status(200).json({
        'ok': true,
        msg: 'Patch API',
    });
}

const userDelete = (req, res) => {
    res.status(200).json({
        'ok': true,
        msg: 'Delete API',
    });
}



module.exports = {
    usersGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}