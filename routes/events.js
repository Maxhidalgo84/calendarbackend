const express = require('express')
const router = express.Router();
const {getEvents,createEvent,updateEvent,deleteEvent} = require('../controlers/events')
const {validateJWT} = require('../middlewares/validate-jwt')
const { check}= require('express-validator');
const { validateField } = require('../middlewares/fieldValidator');
const {isDate} = require('../helpers/isDate')

// todas tienen que pasar por la validacion del JWT
router.use(validateJWT)
//obtener eventos
router.get('/',
[//middlewares
check('title',"el titulo es obligatorio").not().isEmpty(),
check('start',"fecha inicio es obligatorio").custom(isDate),
check('end',"fecha finalizacion es obligatorio").custom(isDate),
validateField
],
getEvents)

//crear nuevo evento
router.post('/',createEvent)

//actualizar evento
router.put('/:id',updateEvent)

//eliminar evento
router.delete('/:id',deleteEvent)

module.exports = router;