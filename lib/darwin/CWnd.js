const { ffihelper } = require('./dll')
class CWnd {
  static testInt (num) {
    return ffihelper.testInt(num)
  }
  static testString (str) {
    return ffihelper.testString(str)
  }
  static AllWindowInfo () {
    return ffihelper.AllWindowInfo()
  }
  static GetRunningAppWithName(winNameReg, winOwnerNameReg = '') {
    let runningApp =  ffihelper.GetRunningAppWithName(winNameReg, winOwnerNameReg)
    if (!runningApp || runningApp.isNull()) {
      return null
    }
    return runningApp
  }
  static SetForegroundApp (runningApp) {
    return ffihelper.SetForegroundApp(runningApp)
  }
}

module.exports = CWnd
