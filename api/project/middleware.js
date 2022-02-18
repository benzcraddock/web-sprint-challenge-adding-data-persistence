async function validateProject(req, res, next) {
  if(!req.body.project_name || !req.body.project_name.trim()) {
    next({
      status: 400,
      message: 'Missing required fields: project name'
    })
  } else {
    next()
  }
}

module.exports = {
  validateProject
}
