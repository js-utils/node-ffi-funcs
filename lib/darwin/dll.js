const FFI = require('ffi-napi')
const path = require('path')

// let ffihelperDllPath = 'C:\\Users\\Liuxy\\documents\\visual studio 2015\\Projects\\ffihelper\\Release\\ffihelper.dll'
let ffihelperDllPath = path.join(__dirname, './dll/ffihelper.dylib')
// console.log(111, ffihelperDllPath)

let ffihelper = new FFI.Library(ffihelperDllPath, {
  'testInt': ['int', ['int']],
  'testString': ['string', ['string']],
  'AllWindowInfo': ['string', []],
  'GetOwnerPidWithName': ['int', ['string', 'string']],
  'GetWindowWithName': ['pointer', ['string', 'string']],
  'GetWindowTitle': ['string', ['pointer']],
  'GetRunningAppWithOwnerPid': ['pointer', ['int']],
  'SetForegroundWindowWithName': ['bool', ['string', 'string']],
  'SetForegroundApp': ['bool', ['pointer']],
  'PostEventKey': ['void', ['int', 'string']],
  'PasteboardCopyString': ['bool', ['string']],
  'ReleaseAXUIElementRef': ['void', ['pointer']]
})
module.exports = { ffihelper }
