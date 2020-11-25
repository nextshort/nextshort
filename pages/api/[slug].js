import { get } from '../../db'
export default async (req, res) => {
    const {
        query: { slug },
    } = req
    const url = await get(slug)
    if (url) {
        return res.json({ err: false, url: url })
    } else {
        return res.json({ err: true, msg: error.message })
    }
}