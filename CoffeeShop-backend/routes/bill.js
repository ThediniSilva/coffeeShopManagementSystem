const express =  require('express');
const connection= require('../connection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var  auth = require('../services/authentication');

router.post('/generateReport',auth,auth.authenticateToken,(req,res)=>{
    const generateUuid = uuid.v1()
})