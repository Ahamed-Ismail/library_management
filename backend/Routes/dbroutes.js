const express = require('express');

const dbcontroller = require('../Controllers/dbcontrollers');

const router = express.Router();

router.get('/getData', dbcontroller.getData);

router.post('/addData', dbcontroller.addData);

router.delete('/deleteData', dbcontroller.deleteData);


module.exports =  router ;    