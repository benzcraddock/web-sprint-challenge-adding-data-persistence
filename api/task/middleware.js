async function validateTask(req, res, next) {
  if(!req.body.task_description || !req.body.task_description.trim()) {
    next({
      status: 400,
      message: 'Missing required fields: task description'
    })
  } else {
    next()
  }
}

module.exports = {
  validateTask
}
