import express from 'express';
import {register, getRegisterPage, } from '../controllers/registerController.js';
import { getAllUsers, deleteUser } from '../controllers/usersController.js';


import {login, getLoginPage } from '../controllers/loginController.js';
const userroutes =express.Router();

userroutes.get('/register', getRegisterPage);
userroutes.post('/register', register);


// Serve login page (GET)
userroutes.get('/login', getLoginPage);

// Handle login form submit (POST)
userroutes.post('/login', login);

// Existing route
// router.post('/register', register);


userroutes.get('/users', getAllUsers); // GET /api/users
userroutes.delete('/users/:id', deleteUser); // DELETE /api/users/:id

export default userroutes;