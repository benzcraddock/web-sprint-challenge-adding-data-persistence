async function validateResource(req, res, next) {
  if(!req.body.resource_name || !req.body.resource_name.trim()) {
    next({
      status: 400,
      message: 'Missing required fields: resource name'
    })
  } else {
    next()
  }
}

module.exports = {
  validateResource
}
