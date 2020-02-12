const FFI = require('ffi-napi')
const path = require('path')

// let ffihelperDllPath = 'C:\\Users\\Liuxy\\documents\\visual studio 2015\\Projects\\ffihelper\\Release\\ffihelper.dll'
let ffihelperDllPath = path.join(__dirname, './dll/ffihelper.dylib')
console.log(ffihelperDllPath)

let ffihelper = new FFI.Library(ffihelperDllPath, {
})
module.exports = { ffihelper }
