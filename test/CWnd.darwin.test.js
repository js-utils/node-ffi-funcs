const expect = require('chai').expect
const { CWnd } = require('../lib')
describe('CWnd TEST', function () {
  // add
  it('static add', async function() {
    console.log('num:', CWnd.testInt(1))
    console.log('string:', CWnd.testString("1"))
    console.log('string:', CWnd.AllWindowInfo())
    console.log('.......')
  })
  // GetRunningAppWithOwnerPid
  it('static GetRunningAppWithName', async function() {
    let ownerPid = CWnd.GetOwnerPidWithWinName("风驰万里1", "Aliworkbench")
    if (ownerPid) {
      let runningApp = CWnd.GetRunningAppWithOwnerPid(ownerPid)
      console.log(11, runningApp)
      console.log(22, CWnd.SetForegroundApp(runningApp))
      setTimeout(() => {
        console.log('continue ...')
        // 复制文字到粘贴板
        console.log(CWnd.PasteboardCopyString("hello world"))
        // 粘贴
        console.log(CWnd.PostEventKey(CWnd.MACRO.KEY_CODE_V, CWnd.MACRO.FLAG_MASK_COMMAND))
        console.log(CWnd.PostEventKey(CWnd.MACRO.KEY_CODE_RETURN))
      }, 3000)
    }
  })
})
