'use strict'

const async = require('async')
const ffmpeg = require('fluent-ffmpeg')

const SUPPORTED_COMMANDS = {
  thumbnails: 1, reduce: 1
}

exports.main = (options, cb) => {
  const {cmd, src, dst} = options

  if (!SUPPORTED_COMMANDS[cmd]) {
    cb(new Error(`Unsupported command: ${cmd}`))
    return
  }

  const fcmd = ffmpeg(src)

  async.waterfall([
    (cb) => fcmd.ffprobe(cb),
    (videoMetadata, cb) => {
      const startedAt = Date.now()

      fcmd.on('start', () => console.log(`Video processing started`))
        .on('error', (err, stdout, stderr) => cb(err, {stdout, stderr}))
        .on('end', (stdout, stderr) => {
          cb(null, {stdout, stderr, duration: Date.now() - startedAt})
        })

      exports._handleCommand(fcmd, {
        cmd, dst, size: '50%', duration: videoMetadata.format.duration
      })
    }
  ], cb)
}

exports._handleCommand = (fcmd, options) => {
  const {cmd, dst, size} = options

  switch (cmd) {
    case 'thumbnails':
      fcmd.thumbnails({
        count: Math.floor(options.duration),
        folder: dst,
        filename: `${Date.now()}-from-%b-%00i.png`,
        size
      })
      break
    case 'reduce':
      fcmd.size(size).output(dst).run()
      break
    default:
      break
  }
}
