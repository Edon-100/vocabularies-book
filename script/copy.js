const fse = require('fs-extra')
const path = require('path')

const srcDir = path.resolve(__dirname, '../utools_ts/assets/')
const destDir = path.resolve(__dirname, '../dist')

fse.copy(srcDir, destDir, err => {
  if (err) return console.error(err)
  console.log('success!')
})