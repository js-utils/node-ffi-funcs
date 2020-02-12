const { ffihelper } = require('./dll')
class CWnd {
  static TestGetInt () {
    return ffihelper.testGetInt()
  }
  static TestGetString () {
    return ffihelper.testGetString()
  }
}

module.exports = CWnd
