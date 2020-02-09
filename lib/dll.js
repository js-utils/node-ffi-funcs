const FFI = require('ffi-napi')
let user32 = new FFI.Library('user32.dll', {
    'GetDesktopWindow': ['pointer', []],
    'FindWindowW': ['pointer', ['string', 'string']],
    'FindWindowExW': ['pointer', ['pointer', 'pointer', 'string', 'string']],
    'IsWindowVisible': ['bool', ['pointer']],
    'SetForegroundWindow': ['bool', ['pointer']],
    'GetParent': ['pointer', ['pointer']],
    'GetWindow': ['pointer', ['pointer', 'uint']],
    'SetWindowTextW': ['bool', ['pointer', 'string']],
    'GetWindowTextW': ['int32', ['pointer', 'pointer', 'int32']],
    'GetClassNameW': ['int32', ['pointer', 'pointer', 'int32']],
    'SendMessageW': ['int32', ['pointer', 'int32', 'int32', 'pointer']],
    'GetDlgCtrlID': ['int32', ['pointer']],
    'GetDlgItem': ['pointer', ['pointer', 'int32']],
    'GetDlgItemTextW': ['int32', ['pointer', 'int32', 'pointer', 'int32']],
    'GetWindowRect': ['bool', ['pointer', 'pointer']]
})
module.exports = { user32 }
