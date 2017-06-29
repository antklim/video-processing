'use strict'

const async = require('async')
const ffmpeg = require('fluent-ffmpeg')

const SUPPORTED_COMMANDS = {
  thumbnails: 1, reduce: 1
}

exports.main = (options, cb) => {
  const {cmd, src, dst} = options

  if (!SUPPORTED_COMMANDS[cmd]) {
    const err = new Error(`Unsupported command: ${cmd}`)
    console.error(err.message)
    cb(err)
    return
  }

  const fcmd = ffmpeg(src)

  async.waterfall([
    (cb) => fcmd.ffprobe(cb),
    (videoMetadata, cb) => {
      const startedAt = Date.now()

      fcmd.on('start', () => console.log(`Video processing started`))
        .on('error', (err, stdout, stderr) => {
          console.error(`Video processing error: ${err.message}`)
          cb(err)
        })
        .on('end', (stdout, stderr) => {
          console.log(`Video processing finished in ${Date.now() - startedAt} msec`)
          cb()
        })

      switch (cmd) {
        case 'thumbnails':
          fcmd.thumbnails({
            count: Math.floor(videoMetadata.format.duration),
            folder: dst,
            filename: `${startedAt}-from-%b-%00i.png`,
            size: '50%'
          })
          break
        case 'reduce':
          fcmd.size('50%').output(dst).run()
          break
        default:
          break
      }
    }
  ], cb)
}
