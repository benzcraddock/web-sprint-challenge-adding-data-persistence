const express = require('express')
const router = express.Router()
const Resource = require('./model')

// Middleware
const {
  validateResource
} = require('./middleware')

// Endpoints
router.get('/', (req, res, next) => {
  Resource.getResources()
    .then(resources => {
      res.status(200).json(resources)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Resource.getResourcesById(req.params.id)
    .then(resource => {
      res.status(200).json(resource)
    })
    .catch(next)
})

router.post('/', validateResource, async (req, res, next) => {
  try {
    const newResource = await Resource.createResource(req.body)
    res.status(200).json(newResource)
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
