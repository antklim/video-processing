const assert = require('assert')
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
    it('should initiate thumbnails generation when `thumbnails` command provided')
    it('should initiate video size reduction when `reduce` command provided')
    it('should call error callback when unsupported command provided', (done) => {
      handler.main({}, (err) => {
        assert.deepEqual(err, new Error('Unsupported command: undefined'))
        done()
      })
    })
    it('should call error callback when video processing failed')
  })
})
