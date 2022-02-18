const express = require('express');
const router = express.Router();
const Project = require('./model');

// Middleware
const {
  validateProject
} = require('./middleware')

// Endpoints


module.exports = router;
