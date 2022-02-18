const db = require('../../data/dbConfig')

function getResources() {
  return db('resources')
}

function getResourcesById(id) {
  return db('resources')
    .where('resource_id', id)
}

function createResource(resource) {
  return db('resources')
    .insert(resource)
    .then(([id]) => { // eslint-disable-line
      return getResourcesById(id)
    })
}

module.exports = {
  getResources,
  getResourcesById,
  createResource
}
