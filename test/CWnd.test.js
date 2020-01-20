const expect = require('chai').expect
const CWnd = require('../lib/CWnd')
const Helper = require('../lib/Helper')
describe('CWnd TEST', function () {
  it('static FindWindow', async function() {
    let className = 'StandardFrame'
    let hWnd = CWnd.FindWindow(className, null)
    while (hWnd && !hWnd.isNull()) {
      let windowTitle = CWnd.GetWindowText(hWnd)
      console.log('now window title: ', windowTitle)
      if (windowTitle.match('风驰万里1')) {
        console.log('real find')
        break
      } else {
        hWnd = CWnd.FindWindowEx(null, hWnd, className, null)
      }
    }
    expect(!!hWnd).to.be.ok
  })
})
