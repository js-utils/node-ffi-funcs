const expect = require('chai').expect
const CWnd = require('../lib/CWnd')
const { CString } = require('../lib/Helper')
describe('CWnd TEST', function () {
  it('static FindWindow', async function() {
    let className = 'StandardFrame'
    let hWnd = CWnd.FindWindow(className, null)
    while (hWnd && !hWnd.isNull()) {
      let className = CWnd.GetClassName(hWnd)
      let windowTitle = CWnd.GetWindowText(hWnd)
      console.log(`window className: ${className}, title: ${windowTitle}`)
      if (windowTitle.match('风驰万里1')) {
        console.log('real find window')
        let textWnd = CWnd.C_FindWindow(hWnd, null, 'RichEditComponent', null)
        if (textWnd) {
          console.log('real find RichEditComponent')
          // 输入框设置文本
          //CWnd.SendMessage(textWnd, CWnd.Message.WM_SETTEXT, null, '好了')
          // 回车发送消息
          //CWnd.SendMessage(textWnd, CWnd.Message.WM_KEYDOWN, CWnd.Message.VK_RETURN, null)
        }
        // 获取输入框的文字
        // if (textWnd) {
        //   let buf = Buffer.alloc(255)
        //   CWnd.SendMessage(textWnd, CWnd.Message.WM_GETTEXT, buf.byteLength, buf)
        //   console.log('text: ', buf.toString('ucs2').replace(/\\0+$/g, ''))
        // }
        break
      } else {
        hWnd = CWnd.FindWindowEx(null, hWnd, className, null)
      }
    }
    expect(!!hWnd).to.be.ok
  })
})
