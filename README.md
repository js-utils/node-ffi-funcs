### 实现的函数（Implemented function）
* CWnd.FindWindow (className = null, windowName = null) // 查找窗口
* CWnd.FindWindowEx (hParent = null, hChild = null, className = null, windowName = null) // 查找窗口高级
* CWnd.IsWindowVisible (hWnd) // 当前窗口是否可见
* CWnd.SetForegroundWindow (hWnd) // 激活窗口, 在最顶层展示
* CWnd.GetParent (hWnd) // 返回给定子窗口的父窗口
* CWnd.GetClassName (hWnd) // 获取窗口类名
* CWnd.SetWindowText (hWnd) // 设置窗口标题
* CWnd.GetWindowText (hWnd) // 获取窗口标题
* CWnd.SendMessage(hWnd, Msg, wParam, lParam) // 发送消息
* CWnd.GetDlgCtrlID(hWnd) // 根据窗口句柄 获取控件ID
* CWnd.GetDlgItem(hWnd, nIDDlgItem) // 根根据父窗口句柄 和 控件ID 获取控件句柄
* CWnd.GetDlgItemText(hWnd) // 根据控件句柄获取控件文字
* CWnd.GetWindowRect(hWnd) // 获取窗口所在屏幕的位置
* CWnd.C_FindWindow(hParent = null, hChild = null, shouldClassNameReg = null, shouldWindowNameReg = null) // 查找某个窗口 - 包括子孙
* CWnd.C_FindSiblingPreviousWindow(hWnd, shouldClassNameReg = null, shouldWindowNameReg = null) // 上一个兄弟节点  可根据要查找的类名或标题 查找最近的一个
* CWnd.C_FindSiblingNextWindow (hWnd, className = null, windowName = null) // 下一个兄弟节点  可根据要查找的类名或标题 查找最近的一个

### 其他（others）

> 屏幕截图（screenshot）
* https://github.com/johnvmt/node-desktop-screenshot

> 图片处理（裁剪、缩放、水印）： CWnd.GetWindowRect获取到窗口位置，然后屏幕截图，根据位置获取窗口图片
* https://github.com/aheckmann/gm
* https://github.com/Automattic/node-canvas
