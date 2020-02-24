const { ffihelper } = require('./dll')
class CWnd {
  // 宏
  static get MACRO () {
    return {
      KEY_CODE_X: 7,
      KEY_CODE_C: 8,
      KEY_CODE_V: 9,
      KEY_CODE_RETURN: 0x24,
      FLAG_MASK_COMMAND: "COMMAND"
    }
  }
  static testInt (num) {
    return ffihelper.testInt(num)
  }
  static testString (str) {
    return ffihelper.testString(str)
  }
  static AllWindowInfo () {
    return ffihelper.AllWindowInfo()
  }
  static GetOwnerPidWithWinName(winNameReg, winOwnerNameReg = '') {
    return ffihelper.GetOwnerPidWithWinName(winNameReg, winOwnerNameReg)
  }
  static GetRunningAppWithOwnerPid(ownerPid) {
    let runningApp =  ffihelper.GetRunningAppWithOwnerPid(ownerPid)
    if (!runningApp || runningApp.isNull()) {
      return null
    }
    return runningApp
  }
  static SetForegroundApp (runningApp) {
    return ffihelper.SetForegroundApp(runningApp)
  }
  // flag: COMMAND => COMMAND + key组合键
  static PostEventKey(key, flagMask = '') {
    return ffihelper.PostEventKey(key, flagMask)
  }
  // 复制文字到粘贴板
  static PasteboardCopyString (string) {
    return ffihelper.PasteboardCopyString(string)
  }
}

module.exports = CWnd
