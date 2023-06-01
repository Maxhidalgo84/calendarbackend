/*
Rutas de usuarios /Auth
host + /api/auth
*/

const express = require('express')
const router = express.Router();
const { check}= require('express-validator')

const {createUser,loginUser,renewUser} = require('../controlers/auth')
const {validateField}= require('../middlewares/fieldValidator')
const {validateJWT} = require('../middlewares/validate-jwt')

// router.get('/',(req,res)=> {
//     res.json({
//         ok:true
//     })
// })

router.post (
    '/new',
    [//middlewares
    check('name',"el nombre es obligatorio").not().isEmpty(),
    check('email','Esto no es un email valido').isEmail(),
    check('password',"el pass debe ser obligatorio").isLength({min: 6}),
    validateField
    ],
    createUser)

router.post (
    '/',
    [
    check('email','Esto no es un email valido').isEmail(),
    check('password',"el pass debe ser obligatorio").isLength({min: 6}),
    validateField
    ],
    loginUser)

router.get ('/renew',validateJWT,


    renewUser)

module.exports = router;