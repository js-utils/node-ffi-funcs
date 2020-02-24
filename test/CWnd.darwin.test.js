const expect = require('chai').expect
const { CWnd } = require('../lib')
describe('CWnd TEST', function () {
  // add
  it('static add', async function() {
    console.log('num:', CWnd.testInt(1))
    console.log('string:', CWnd.testString("1"))
    console.log('string:', CWnd.AllWindowInfo())
  })
  // GetRunningAppWithName
  it('static GetRunningAppWithName', async function() {
    let runningApp = CWnd.GetRunningAppWithName("风驰万里1", "Aliworkbench")
    console.log(11, runningApp)
    console.log(22, CWnd.SetForegroundApp(runningApp))
    setTimeout(() => {
      console.log('continue ...')
      // 粘贴
      CWnd.PostEventKey(CWnd.MACRO.KEY_CODE_V, CWnd.MACRO.FLAG_MASK_COMMAND)
      CWnd.PostEventKey(CWnd.MACRO.KEY_CODE_RETURN)
    }, 3000)
  })
})
