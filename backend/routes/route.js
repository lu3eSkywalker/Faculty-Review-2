const express = require('express');
const { signup, login, faculty, getFacultyByName, review, logout } = require('../controllers/Auth');
const router = express.Router();

//import controller


router.post('/signup', signup)
router.post('/login', login)
router.post('/faculty', faculty)
router.post('/review', review)
router.get('/getfaculty/:title', getFacultyByName)
router.post('/logout', logout)


module.exports = router;