const { user32 } = require('./dll')
const { CString } = require('./Helper')
class CWnd {
  // 查找窗口
  static FindWindow (className = null, windowName = null) {
    let hWnd = user32.FindWindowW(CString(className), CString(windowName))
    if (hWnd.isNull()) {
      return null
    }
    return hWnd
  }
  // 查找窗口高级
  static FindWindowEx (hParent = null, hChild = null, className = null, windowName = null) {
    let hWnd = user32.FindWindowExW(hParent, hChild, CString(className), CString(windowName))
    if (hWnd.isNull()) {
      return null
    }
    return hWnd
  }
  // 获取窗口标题
  static GetWindowText (hWnd) {
    let buf = Buffer.alloc(255)
    user32.GetWindowTextW(hWnd, buf, buf.byteLength)
    return buf.toString('ucs2').replace(/\\0+$/, '')
  }
}

module.exports = CWnd
