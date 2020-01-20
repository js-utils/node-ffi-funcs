class Helper {
    static CString (string) {
        return string && Buffer.from(`${string}\0`, 'ucs2') || null
    }
}
module.exports = Helper
