const expect = require('chai').expect
const { CWnd } = require('../lib')
describe('CWnd TEST', function () {
  // testGetInt testGetString
  it('static GetDesktopWindow', async function() {
    console.log(CWnd.TestGetInt())
    console.log(CWnd.TestGetString())
  })
})
