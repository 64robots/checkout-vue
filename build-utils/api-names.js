const fs = require('fs')
const path = require('path')

// Get all the .vue files in the src directory
const apiFileNames = fs
  .readdirSync(path.resolve(__dirname, '../src/api'))
  .filter(apiFileName => /\.js$/.test(apiFileName))

// Get the names of the components from the file names
module.exports = apiFileNames.map(apiFileName =>
  apiFileName.replace(/\.\w+$/, '')
)
