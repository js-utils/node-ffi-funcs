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
  // 获取到的窗口需要手动释放，防止内存泄漏（ReleaseAXUIElementRef）
  static GetOwnerPidWithName(winNameReg, winOwnerNameReg = '') {
    return ffihelper.GetOwnerPidWithName(winNameReg, winOwnerNameReg)
  }
  static GetWindowWithName(winNameReg, winOwnerNameReg = '') {
    let windowRef = ffihelper.GetWindowWithName(winNameReg, winOwnerNameReg)
    if (!windowRef || windowRef.isNull()) {
      return null
    }
    return windowRef
  }
  static GetWindowTitle(window) {
    return ffihelper.GetWindowTitle(window);
  }
  static GetRunningAppWithOwnerPid(ownerPid) {
    let runningApp =  ffihelper.GetRunningAppWithOwnerPid(ownerPid)
    if (!runningApp || runningApp.isNull()) {
      return null
    }
    return runningApp
  }
  static SetForegroundWindowWithName(winNameReg, winOwnerNameReg = '') {
    return ffihelper.SetForegroundWindowWithName(winNameReg, winOwnerNameReg)
  }
  static SetForegroundApp (runningApp) {
    return ffihelper.SetForegroundApp(runningApp)
  }
  static GetFocusWindowWithApp (runningApp) {
    let focusWindow = ffihelper.GetFocusWindowWithApp(runningApp)
    if (!focusWindow || focusWindow.isNull()) {
      return null
    }
    return focusWindow
  }
  static GetFocusWindowWithOwnerPid (ownerPid) {
    let focusWindow = ffihelper.GetFocusWindowWithOwnerPid(ownerPid)
    if (!focusWindow || focusWindow.isNull()) {
      return null
    }
    return focusWindow
  }
  // flag: COMMAND => COMMAND + key组合键
  static PostEventKey(key, flagMask = '') {
    return ffihelper.PostEventKey(key, flagMask)
  }
  // 复制文字到粘贴板
  static PasteboardCopyString (string) {
    return ffihelper.PasteboardCopyString(string)
  }
  // 手动释放句柄
  static ReleaseAXUIElementRef(elementRef) {
    return ffihelper.ReleaseAXUIElementRef(elementRef)
  }
}

module.exports = CWnd
