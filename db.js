const level = require('level')
const getdb = () => {
    return level('urls', { valueEncoding: 'json' })
}
const get = async (key) => {
    const db = getdb()
    try {
        const value = db.get(key)
        await db.close()
        return value
    } catch (error) {
        await db.close()
        return null
    }
}
const put = async (key, value) => {
    const db = getdb()
    try {
        await db.put(key, value)
        await db.close()
        return true
    } catch (error) {
        console.log(error.message)
        await db.close()
        return false
    }
}
export {
    get, put
}