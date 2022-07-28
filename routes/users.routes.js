const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, userPut, userPost, userPatch, userDelete, userSingleGet } = require('../controllers/users.controller');
const { isValidRole, existsMail, existsUserById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.get('/', usersGet);

router.get('/:userId', userSingleGet);

router.put('/:userId', [
    check('userId', 'This is not a valid id').isMongoId(),
    check('userId').custom(existsUserById),
    check('role').custom(isValidRole),
    validateFields
], userPut);

router.post('/', [
    check('mail', 'The mail is not valid').isEmail(),
    check('mail').custom(existsMail),
    check('name', 'The name is mandatory').not().isEmpty(),
    check('password', 'The password is mandatory and should contain more than 6 characters').isLength({ min: 6 }),
    check('role').custom((role) => isValidRole(role)),
    validateFields
], userPost);

router.patch('/', userPatch);

router.delete('/:userId', [
    check('userId', 'This is not a valid id').isMongoId(),
    check('userId').custom(existsUserById),
    validateFields
], userDelete);

module.exports = router;