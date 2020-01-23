const FFI = require('ffi')
let user32 = new FFI.Library('user32.dll', {
    'FindWindowW': ['pointer', ['string', 'string']],
    'FindWindowExW': ['pointer', ['pointer', 'pointer', 'string', 'string']],
    'GetWindowTextW': ['int32', ['pointer', 'pointer', 'int32']],
    'GetClassNameW': ['int32', ['pointer', 'pointer', 'int32']],
    'SendMessageW': ['int32', ['pointer', 'int32', 'int32', 'pointer']]
})
module.exports = { user32 }
