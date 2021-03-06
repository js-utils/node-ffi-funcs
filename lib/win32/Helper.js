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
    // 传递rect是处理获取真实位置，不传是获取rect指针
    static LPRect(rect) {
        if (!rect) {
            return Buffer.alloc(4 * 4)
        } else {
            return {
                left: rect.readUInt32LE(0),
                top: rect.readUInt32LE(4),
                right: rect.readUInt32LE(8),
                bottom: rect.readUInt32LE(12)
            }
        }
    }
}
module.exports = Helper
