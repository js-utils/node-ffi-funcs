const FFI = require('ffi-napi')
const path = require('path')

// let ffihelperDllPath = 'C:\\Users\\Liuxy\\documents\\visual studio 2015\\Projects\\ffihelper\\Release\\ffihelper.dll'
let ffihelperDllPath = path.join(__dirname, './dll/ffihelper.dylib')
// console.log(111, ffihelperDllPath)

let ffihelper = new FFI.Library(ffihelperDllPath, {
  'testInt': ['int', ['int']],
  'testString': ['string', ['string']],
  'AllWindowInfo': ['string', []],
  'GetRunningAppWithName': ['pointer', ['string', 'string']],
  'SetForegroundApp': ['bool', ['pointer']],
  'PostEventKey': ['void', ['int', 'string']],
})
module.exports = { ffihelper }
