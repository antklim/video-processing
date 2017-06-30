const assert = require('assert')
const async = require('async')
const ffmpeg = require('fluent-ffmpeg')
const sinon = require('sinon')
const handler = require('./handler')

describe('Video processor', () => {
  let sandbox = null

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('main', () => {
    it('should call error callback when unsupported command provided', (done) => {
      const ffmpegSpy = sinon.spy(ffmpeg)
      const asyncSpy = sinon.spy(async, 'waterfall')

      handler.main({}, (err) => {
        assert.deepEqual(err, new Error('Unsupported command: undefined'))
        assert(ffmpegSpy.notCalled)
        assert(asyncSpy.notCalled)
        done()
      })
    })
    it('should call error callback when video processing failed')
  })

  describe('_handleCommand', () => {
    it('should initiate thumbnails generation when `thumbnails` command provided', () => {
      const thumbnails = sinon.spy()
      const size = sinon.spy()
      const stub = {thumbnails, size}

      handler._handleCommand(stub, {
        cmd: 'thumbnails',
        dst: 'test',
        duration: 20,
        size: '50%'
      })
      assert(thumbnails.calledOnce)
      assert(size.notCalled)

      const args = thumbnails.args[0][0]
      assert.equal(args.count, 20)
      assert.equal(args.folder, 'test')
      assert(args.filename)
      assert.equal(args.size, '50%')
    })

    it('should initiate video size reduction when `reduce` command provided', () => {
      const thumbnails = sinon.spy()
      const size = sinon.spy()
      const output = sinon.spy()
      const run = sinon.spy()
      const stub = {
        thumbnails,
        size: (args) => {
          size(args)
          return stub
        },
        output: (args) => {
          output(args)
          return stub
        },
        run
      }

      handler._handleCommand(stub, {cmd: 'reduce', dst: 'test', size: '50%'})
      assert(thumbnails.notCalled)

      assert(size.calledOnce)
      assert.equal(size.args[0][0], '50%')

      assert(output.calledOnce)
      assert.equal(output.args[0][0], 'test')

      assert(run.calledOnce)
    })
  })
})
