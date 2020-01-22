class Helper {
    static CString (string) {
        return string && Buffer.from(`${string}\0`, 'ucs2') || null
    }
    static WParam (param) {
        if (param) {
            if (typeof param === 'string') {
                return Helper.CString(param)
            }
        }
        return param
    }
    static LParam (param) {
        return Helper.WParam(param)
    }
}
module.exports = Helper
