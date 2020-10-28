const { Router } = require('express')
const jwt = require('jsonwebtoken')

const Post = require('./../../src/db/schemas/post').model
