'use strict'

const {main} = require('./handler')

const options = {
  cmd: process.argv[2],
  src: process.argv[3],
  dst: process.argv[4],
}

main(options, (err) => {
  process.exit(err ? 1 : 0)
})
