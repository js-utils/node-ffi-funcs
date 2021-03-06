const { user32, gdi32, ffihelper } = require('./dll')
const { CString, LParam, LPRect } = require('./Helper')
class CWnd {
  // 宏
  static get MACRO () {
    return {
      WM_SETTEXT: 0x000C,
      WM_GETTEXT: 0x000D,
      WM_KEYDOWN: 0x0100,
      VK_RETURN: 0x0D,
      // https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindow
      GW_CHILD: 5, // 寻找源窗口的第一个子窗口
      GW_ENABLEDPOPUP: 6,
      GW_HWNDFIRST: 0, // 为一个源子窗口寻找第一个兄弟（同级）窗口，或寻找第一个顶级窗口
      GW_HWNDLAST: 1, // 为一个源子窗口寻找最后一个兄弟（同级）窗口，或寻找最后一个顶级窗口
      GW_HWNDNEXT: 2, // 为源窗口寻找下一个激活窗口
      GW_HWNDPREV: 3, // 为源窗口寻找前一个激活窗口
      GW_OWNER: 4, // 寻找窗口的所有者
      CF_TEXT: 1,
      CF_BITMAP: 2
    }
  }
  // 获取桌面窗口
  static GetDesktopWindow () {
    return user32.GetDesktopWindow()
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
  // https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindow
  // 返回给定窗相关(uCmd)的窗口 uCmd -> MACRO.GW_xxx
  static GetWindow (hWnd, uCmd) {
    let hGetWnd = user32.GetWindow(hWnd, uCmd)
    if (!hGetWnd || hGetWnd.isNull()) {
      return null
    }
    return hGetWnd
  }
  // 获取窗口类名
  static GetClassName (hWnd) {
    let buf = Buffer.alloc(255, 0)
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
  // 获取窗口第一个孩子
  static C_GetWindowFirstChild (hWnd) {
    let hGetWnd = user32.GetWindow(hWnd, this.MACRO.GW_CHILD)
    if (!hGetWnd || hGetWnd.isNull()) {
      return null
    }
    return hGetWnd
  }
  // 获取窗口第一个兄弟节点 （如果当前窗口在兄弟里排第一位，那么第一个兄弟窗口就是自己）
  static C_GetWindowFirstSibling (hWnd) {
    let hGetWnd = user32.GetWindow(hWnd, this.MACRO.GW_HWNDFIRST)
    if (!hGetWnd || hGetWnd.isNull()) {
      return null
    }
    return hGetWnd
  }
  // 获取上一个兄弟
  static C_GetWindowPreviousSibling(hWnd) {
    return this.C_FindWindowSiblingPrevious(hWnd)
  }
  // 获取下一个兄弟
  static C_GetWindowNextSibling(hWnd) {
    return this.C_FindWindowSiblingNext(hWnd)
  }
  // 获取窗口最后一个兄弟节点 （如果当前窗口在兄弟里排最后一位，那么最后一个兄弟窗口就是自己）
  static C_GetWindowLastSibling (hWnd) {
    let hGetWnd = user32.GetWindow(hWnd, this.MACRO.GW_HWNDLAST)
    if (!hGetWnd || hGetWnd.isNull()) {
      return null
    }
    return hGetWnd
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
  static C_FindWindowSiblingPrevious (hWnd, shouldClassNameReg = null, shouldWindowNameReg = null) {
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
  static C_FindWindowSiblingNext (hWnd, className = null, windowName = null) {
    let findHWnd = this.FindWindowEx(this.GetParent(hWnd), hWnd, className, windowName)
    if (!findHWnd || findHWnd.isNull()) {
      return null
    }
    return findHWnd
  }
  // uFormat: #define CF_TEXT 1 #define CF_BITMAP 2 ...
  static GetClipboardData (uFormat) {
    user32.OpenClipboard(null)
    let pointer = user32.GetClipboardData(uFormat)
    user32.CloseClipboard()
    if (!pointer || pointer.isNull()) {
      return null
    }
    return pointer
  }
  // uFormat: #define CF_TEXT 1 #define CF_BITMAP 2 ...
  static SetClipboardData (uFormat, hMem) {
    user32.OpenClipboard(null)
    user32.EmptyClipboard()
    user32.SetClipboardData(uFormat, hMem)
    user32.CloseClipboard()
  }
  // 根据窗口句柄转bmp图片剪切板
  static C_HWNDToBmpClipboard (hWnd) {
    // 生成hBitmap
    let rect = this.GetWindowRect(hWnd)
    let width = rect.right - rect.left
    let height = rect.bottom - rect.top

    let hdcSrc = user32.GetWindowDC(hWnd)
    let hdcDest = gdi32.CreateCompatibleDC(hdcSrc)
    let hBitmap = gdi32.CreateCompatibleBitmap(hdcSrc, width, height)
    let hOld = gdi32.SelectObject(hdcDest, hBitmap)
    let isSuccess = user32.PrintWindow(hWnd, hdcDest, 0)
    if (isSuccess) {
      this.SetClipboardData(CWnd.MACRO.CF_BITMAP, hBitmap)
    }
  }
  // 根据窗口句柄转bmp图片路径
  // static C_HWndToBmpFile(hWnd) {
  //   let rect = this.GetWindowRect(hWnd)
  //   let width = rect.right - rect.left
  //   let height = rect.bottom - rect.top
  //
  //   let hdcSrc = user32.GetWindowDC(hWnd)
  //   let hdcDest = gdi32.CreateCompatibleDC(hdcSrc)
  //   let hBitmap = gdi32.CreateCompatibleBitmap(hdcSrc, width, height)
  //   let hOld = gdi32.SelectObject(hdcDest, hBitmap)
  //   let isSuccess = user32.PrintWindow(hWnd, hdcDest, 0)
  //   let bmpImgPath = ''
  //   if (isSuccess) {
  //     let buf = Buffer.alloc(255, 0)
  //     ffihelper.HBitmapToBmpFile(hBitmap, buf)
  //     bmpImgPath = buf.toString('ucs2').replace(new RegExp('\0', 'g'), '')
  //   }
  //   gdi32.SelectObject(hdcDest, hOld);
  //   gdi32.DeleteObject(hBitmap)
  //   gdi32.DeleteDC(hdcDest) // 删除用过的对象
  //   user32.ReleaseDC(hWnd, hdcSrc)
  //   return bmpImgPath
  // }
  static C_HWndToBmpFile(hWnd) {
    let buf = Buffer.alloc(255, 0)
    ffihelper.HWndToBmpFile(hWnd, buf)
    return buf.toString('ucs2').replace(new RegExp('\0', 'g'), '')
  }
}

module.exports = CWnd
