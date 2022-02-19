const db = require('../../data/dbConfig')

async function getProjects() {
  const projects = await db('projects')

  const newProjects = []

  // Boolean logic
  // -> when project_completed is 0 (defaultTo, false, or incomplete), push case to newProjects array.
  // -> when project_completed is 1 (true), push case to newProjects array.
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
    .first()
    // add .first() above 'where' query to fix return error below
    
  let completed = project.project_completed

  // Boolean logic 
  // -> if completed is 0 or not completed, completed is false.
  // -> else, completed is true.
  if(completed === 0 || !completed) {
    completed = false
  } else {
    completed = true
  }

  // Responds with the newly created project (spread) with its project_completed as a boolean
  return {
    ...project,
    project_completed: completed
  }
}

async function createProject(project) {
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
