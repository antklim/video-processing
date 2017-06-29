'use strict'

const {main} = require('./handler')

const options = {
  cmd: process.argv[2],
  src: process.argv[3],
  dst: process.argv[4],
}

main(options, (err, data) => {
  if (err) {
    console.error(`Video processing error: ${err.message}`)
    process.exit(1)
  }

  console.log(`Video processing finished in ${data.duration} msec`)
  process.exit(0)
})
