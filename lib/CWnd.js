const { user32 } = require('./dll')
const { CString, LParam, LPRect } = require('./Helper')
class CWnd {
  static get Message () {
    return {
      WM_SETTEXT: 0x000C,
      WM_GETTEXT: 0x000D,
      WM_KEYDOWN: 0x0100,
      VK_RETURN: 0x0D
    }
  }

  // 查找窗口
  static FindWindow (className = null, windowName = null) {
    let hWnd = user32.FindWindowW(CString(className), CString(windowName))
    if (!hWnd || hWnd.isNull()) {
      return null
    }
    return hWnd
  }
  // 查找窗口高级
  static FindWindowEx (hParent = null, hChild = null, className = null, windowName = null) {
    let hWnd = user32.FindWindowExW(hParent, hChild, CString(className), CString(windowName))
    if (!hWnd || hWnd.isNull()) {
      return null
    }
    return hWnd
  }
  // 当前窗口是否可见
  static IsWindowVisible (hWnd) {
    return user32.IsWindowVisible(hWnd)
  }
  // 激活窗口, 在最顶层展示
  static SetForegroundWindow (hWnd) {
    return user32.SetForegroundWindow(hWnd)
  }
  // 返回给定子窗口的父窗口
  static GetParent (hWnd) {
    let hParentWnd = user32.GetParent(hWnd)
    if (!hParentWnd || hParentWnd.isNull()) {
      return null
    }
    return hParentWnd
  }
  // 获取窗口类名
  static GetClassName (hWnd) {
    let buf = Buffer.alloc(255)
    user32.GetClassNameW(hWnd, buf, buf.byteLength)
    return buf.toString('ucs2').replace(new RegExp('\0', 'g'), '')
  }
  // 设置窗口标题
  static SetWindowText (hWnd, windowName) {
    return user32.SetWindowTextW(hWnd, CString(windowName))
  }
  // 获取窗口标题
  static GetWindowText (hWnd) {
    let buf = Buffer.alloc(255, 0)
    user32.GetWindowTextW(hWnd, buf, buf.byteLength)
    return buf.toString('ucs2').replace(new RegExp('\0', 'g'), '')
  }
  // 发送消息
  static SendMessage(hWnd, Msg, wParam, lParam) {
    return user32.SendMessageW(hWnd, Msg, wParam, LParam(lParam))
  }
  // 根据窗口句柄 获取控件ID
  static GetDlgCtrlID(hWnd) {
    return user32.GetDlgCtrlID(hWnd)
  }
  // 根据父窗口句柄 和 控件ID 获取控件句柄
  static GetDlgItem(hWnd, nIDDlgItem) {
    return user32.GetDlgItem(hWnd, nIDDlgItem)
  }
  // 根据控件句柄获取控件文字
  static GetDlgItemText(hWnd) {
    let parentHWnd = CWnd.GetParent(hWnd)
    let nIDDlgItem = CWnd.GetDlgCtrlID(hWnd)
    let buf = Buffer.alloc(255, 0)
    user32.GetDlgItemTextW(parentHWnd, nIDDlgItem, buf, buf.byteLength)
    return buf.toString('ucs2').replace(new RegExp('\0', 'g'), '')
  }
  // 获取窗口所在屏幕的位置
  static GetWindowRect(hWnd) {
    let lpRect = LPRect()
    let isSuccess = user32.GetWindowRect(hWnd, lpRect)
    if (isSuccess) {
      return LPRect(lpRect)
    }
    return null
  }
  // 查找某个窗口 - 包括子孙
  static C_FindWindow(hParent = null, hChild = null, shouldClassNameReg = null, shouldWindowNameReg = null) {
    let hWnd = this.FindWindowEx(hParent, hChild, null, null);
    if (hWnd) {
      if ((!shouldClassNameReg || this.GetClassName(hWnd).match(shouldClassNameReg)) && (!shouldWindowNameReg || this.GetWindowText(hWnd).match(shouldWindowNameReg))) {
        return hWnd;
      }
      else {
        // 查找孩子
        let childWnd = this.C_FindWindow(hWnd, null, shouldClassNameReg, shouldWindowNameReg);
        if (childWnd) {
          return childWnd;
        }
        // 查找兄弟
        return this.C_FindWindow(hParent, hWnd, shouldClassNameReg, shouldWindowNameReg);
      }
    }
    return null
  }
  // 上一个兄弟节点  可根据要查找的类名或标题 查找最近的一个
  static C_FindSiblingPreviousWindow (hWnd, shouldClassNameReg = null, shouldWindowNameReg = null) {
    let parentWnd = this.GetParent(hWnd);
    let findHWnd = null
    let preHWnd = null
    let currentHWnd = this.FindWindowEx(parentWnd, null, null, null)
    if (parentWnd) {
      while (currentHWnd) {
        if (currentHWnd.address() == hWnd.address()) {
          break
        } else {
          if ((!shouldClassNameReg || this.GetClassName(currentHWnd).match(shouldClassNameReg)) && (!shouldWindowNameReg || this.GetWindowText(currentHWnd).match(shouldWindowNameReg))) {
            findHWnd = currentHWnd
          }
          preHWnd = currentHWnd
          currentHWnd = this.FindWindowEx(parentWnd, preHWnd, null, null)
        }
      }
    }
    if (!findHWnd || findHWnd.isNull()) {
      return null
    }
    return findHWnd
  }
  // 下一个兄弟节点  可根据要查找的类名或标题 查找最近的一个
  static C_FindSiblingNextWindow (hWnd, className = null, windowName = null) {
    let findHWnd = this.FindWindowEx(this.GetParent(hWnd), hWnd, className, windowName)
    if (!findHWnd || findHWnd.isNull()) {
      return null
    }
    return findHWnd
  }
}

module.exports = CWnd
