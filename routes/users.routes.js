const { Router } = require('express');
const { usersGet, userPut, userPost, userPatch, userDelete } = require('../controllers/users.controller');
const router = Router();

router.get('/', usersGet);

router.put('/:userId', userPut);

router.post('/', userPost);

router.patch('/', userPatch);

router.delete('/', userDelete);

module.exports = router;