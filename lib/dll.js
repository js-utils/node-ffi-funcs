const FFI = require('ffi')
const ref = require('ref')
let stringPtr = ref.refType(ref.types.CString);
let user32 = new FFI.Library('user32.dll', {
    'FindWindowW': ['pointer', ['string', 'string']],
    'FindWindowExW': ['pointer', ['pointer', 'pointer', 'string', 'string']],
    'GetWindowTextW': ['int32', ['pointer', 'pointer', 'int32']]
})
module.exports = { user32 }
