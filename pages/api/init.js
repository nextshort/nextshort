import {get,put} from '../../db'
export default async (req, res) => {
    const {
        body: { url },
    } = req
    res.statusCode = 200;
    return res.json({ err: !await put('id', 100000000) })
}