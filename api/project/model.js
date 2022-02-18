const db = require('../../data/dbConfig')

async function getProjects() {
  const projects = await db('projects')

  const newProjects = []

  // Boolean logic
  // -> when project_completed is 0 (defaultTo, false, or incomplete), push case to newProjects array.
  // -> when projecT_completed is 1 (true), push case to newProjects array.
  projects.forEach((e) => {
    e.project_completed === 0 ?
      newProjects.push({
        ...e,
        project_completed: false
      }) :
      newProjects.push({
        ...e,
        project_completed: true
      })
  })

  return newProjects
}

async function getProjectsById(id) {
  const project = await db('projects')
    .where('project_id', id)

  let completed = project.project_completed

  // Boolean logic 
  // -> if completed is 0 or not completed, completed is false.
  // -> else, completed is true.
  if(completed === 0 || !completed) {
    completed = false
  } else {
    completed = true
  }

  return project
}

function createProject(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => { // eslint-disable-line
      return getProjectsById(id)
    })
}

module.exports = {
  getProjects,
  getProjectsById,
  createProject
}
