require('dotenv').config()

const server = require('./api/server')

// Bring port number from `process.env` variable, falling back to `9000` if `process.env.PORT` is undefined
const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
