const express = require('express')
const router = express.Router()
const Project = require('./model')

// Middleware
const {
  validateProject
} = require('./middleware')

// Endpoints
router.get('/', (req, res, next) => {
  Project.getProjects()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Project.getProjectsById(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
})

router.post('/', validateProject, async (req, res, next) => {
  try {
    const newProject = await Project.createProject(req.body)
    res.status(200).json(newProject)
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
