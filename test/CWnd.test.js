const expect = require('chai').expect
const CWnd = require('../lib/CWnd')
describe('CWnd TEST', function () {
  // FindWindow 获取桌面下的窗口
  it('static FindWindow', async function() {
    let hWnd = CWnd.FindWindow(null, null)
    expect(!!hWnd).to.be.ok
    let className = CWnd.GetClassName(hWnd)
    let hWnd2 = CWnd.FindWindow(className, null)
    // 判断Buffer是否为同一句柄，需要判断他们地址是否相同 important
    expect(hWnd.address() === hWnd2.address()).to.be.ok
  })
  // FindWindowEx 提供父聚丙和某个子聚丙，以此为基础向下寻找某个符合的窗口
  it('static FindWindowEx', async function() {
    let hWnd = CWnd.FindWindow(null, null)
    let hWnd2 = CWnd.FindWindowEx(null,null, null, null)
    expect(hWnd.address() === hWnd2.address()).to.be.ok
  })
  // // IsWindowVisible
  it('static IsWindowVisible', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    let isWindowVisible = CWnd.IsWindowVisible(hWnd)
    expect(isWindowVisible).to.be.ok
  })
  // SetForegroundWindow
  it('static SetForegroundWindow', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    let isSetForeground = CWnd.SetForegroundWindow(hWnd)
    expect(isSetForeground).to.be.ok
  })
  // GetParent
  it('static GetParent', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)

    let startHWnd = CWnd.FindWindowEx(hWnd, null, 'Start', null)
    let parentHWnd = CWnd.GetParent(startHWnd)

    expect(hWnd.address() === parentHWnd.address()).to.be.ok
  })
  // GetClassName
  it('static GetClassName', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    expect(CWnd.GetClassName(hWnd) === "Shell_TrayWnd").to.be.ok
  })
  // SetWindowText GetWindowText
  it('static SetWindowText/GetWindowText', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    CWnd.SetWindowText(hWnd, "CustomTrapName")
    let winName = CWnd.GetWindowText(hWnd)
    expect(winName === "CustomTrapName").to.be.ok
  })
  // SendMessage
  it('static SendMessage', async function() {
    // 输入框设置文本
    // CWnd.SendMessage(textWnd, CWnd.Message.WM_SETTEXT, null, '好了3')
  })
  // C_FindWindow
  it('static C_FindWindow', async function() {
    let hWnd = CWnd.C_FindWindow(null, null, "Start", null)
    let parentClassName = CWnd.GetClassName(CWnd.GetParent(hWnd))
    expect(parentClassName === "Shell_TrayWnd").to.be.ok
  })
  // C_FindSiblingPreviousWindow C_FindSiblingNextWindow
  it('static C_FindSiblingPreviousWindow/C_FindSiblingNextWindow', async function() {
    let hWnd = CWnd.FindWindow("Shell_TrayWnd", null)
    let startHWnd = CWnd.C_FindWindow(hWnd, null, "Start", null)
    CWnd.SetWindowText(startHWnd, "CustomStart")
    let nextHWnd = CWnd.C_FindWindow(hWnd, startHWnd, null, null)
    CWnd.SetWindowText(nextHWnd, "CustomNext")
    let startHWnd2 = CWnd.C_FindSiblingPreviousWindow(nextHWnd)
    let nextHWnd2 = CWnd.C_FindSiblingNextWindow(startHWnd)
    expect(startHWnd.address() === startHWnd2.address()).to.be.ok
    expect(nextHWnd.address() === nextHWnd2.address()).to.be.ok
  })
  // // FIXME: CUSTOM TEST
  // it('static FindWindow', async function() {
  //   let className = 'StandardFrame'
  //   let hWnd = CWnd.FindWindow(className, null)
  //   while (hWnd && !hWnd.isNull()) {
  //     let className = CWnd.GetClassName(hWnd)
  //     let windowTitle = CWnd.GetWindowText(hWnd)
  //     console.log(`window className: ${className}, title: ${windowTitle}`)
  //     if (windowTitle.match('风驰万里1')) {
  //       console.log('real find chat window', 'visible:', CWnd.IsWindowVisible(hWnd))
  //       console.log('active window: ', CWnd.SetForegroundWindow(hWnd))
  //       let textWnd = CWnd.C_FindWindow(hWnd, null, 'RichEditComponent', null)
  //       if (textWnd) {
  //         console.log('real find RichEditComponent')
  //         // 输入框设置文本
  //         CWnd.SendMessage(textWnd, CWnd.Message.WM_SETTEXT, null, '好了3')
  //         // 回车发送消息
  //         CWnd.SendMessage(textWnd, CWnd.Message.WM_KEYDOWN, CWnd.Message.VK_RETURN, null)
  //       }
  //       // 获取输入框的文字
  //       // if (textWnd) {
  //       //   let buf = Buffer.alloc(255)
  //       //   CWnd.SendMessage(textWnd, CWnd.Message.WM_GETTEXT, buf.byteLength, buf)
  //       //   console.log('text: ', buf.toString('ucs2').replace(/\\0+$/g, ''))
  //       // }
  //       break
  //     } else {
  //       hWnd = CWnd.FindWindowEx(null, hWnd, className, null)
  //     }
  //   }
  //   expect(!!hWnd).to.be.ok
  // })
})
