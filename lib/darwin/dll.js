const FFI = require('ffi-napi')
const path = require('path')

// let ffihelperDllPath = 'C:\\Users\\Liuxy\\documents\\visual studio 2015\\Projects\\ffihelper\\Release\\ffihelper.dll'
let ffihelperDllPath = path.join(__dirname, './dll/ffihelper.dylib')
// console.log(111, ffihelperDllPath)

let ffihelper = new FFI.Library(ffihelperDllPath, {
  'testInt': ['int', ['int']],
  'testString': ['string', ['string']],
  'AllWindowInfo': ['string', []],
  'GetOwnerPidWithWinName': ['int', ['string', 'string']],
  'GetWindowWithWinName': ['pointer', ['string', 'string']],
  'GetRunningAppWithOwnerPid': ['pointer', ['int']],
  'SetForegroundApp': ['bool', ['pointer']],
  'PostEventKey': ['void', ['int', 'string']],
  'PasteboardCopyString': ['bool', ['string']],
})
module.exports = { ffihelper }
