const db = require('../../data/dbConfig')

async function getTasks() {
  const tasks = await db('tasks as t')
    .leftJoin('projects as p', 'p.project_id', 't.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')

  const newTasks = []

  // Boolean logic
  // -> when task_completed is 0 (defaultTo, false, or incomplete), push case to newTasks array.
  // -> when task_completed is 1 (true), push case to newTasks array.
  tasks.forEach((e) => {
    e.task_completed === 0 ?
      newTasks.push({
        ...e,
        task_completed: false
      }) :
      newTasks.push({
        ...e,
        task_completed: true
      })
  })

  return newTasks
}

async function getTasksById(id) {
  const task = await db('tasks')
    .where('task_id', id)

  let completed = task.task_completed

  // Boolean logic 
  // -> if completed is 0 or not completed, completed is false.
  // -> else, completed is true.
  if(completed === 0 || !completed) {
    completed = false
  } else {
    completed = true
  }

  // Responds with the newly created task (spread) with its task_completed as a boolean
  return {
    ...task,
    task_completed: completed
  }
}

function createTask(task) {
  return db('tasks')
    .insert(task)
    .then(([id]) => { // eslint-disable-line
      return getTasksById(id)
    })
}

module.exports = {
  getTasks,
  getTasksById,
  createTask
}
