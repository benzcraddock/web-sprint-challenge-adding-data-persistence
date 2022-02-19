const express = require('express')
const router = express.Router()
const Task = require('./model')

// Middleware
const {
  validateTask
} = require('./middleware')

// Endpoints
router.get('/', (req, res, next) => {
  Task.getTasks()
    .then(tasks => {
      res.status(200).json(tasks)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Task.getTasksById(req.params.id)
    .then(task => {
      res.status(200).json(task)
    })
    .catch(next)
})

router.post('/', validateTask, async (req, res, next) => {
  try {
    const newTask = await Task.createTask(req.body)
    res.status(200).json(newTask)
  }
  catch(err) {
    next(err)
  }
})

module.exports = router
