import { get, put } from '../../db'
// const currentPath = process.cwd();
function string10to62(number) {
    var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ'.split(''),
        radix = chars.length,
        qutient = +number,
        arr = [];
    do {
        let mod = qutient % radix;
        qutient = (qutient - mod) / radix;
        arr.unshift(chars[mod]);
    } while (qutient);
    return arr.join('');
}

export default async (req, res) => {
    const {
        body: { url },
    } = req
    res.statusCode = 200;
    let id = await get('id')
    if (id) {
        id += 1
    } else {
        id = 1000000
    }
    const slug = string10to62(id)
    const flag1 = await put('id', id)
    const flag2 = await put(slug, url)
    const err = flag1 + flag2 == 2 ? false : true
    return res.json({ err, slug, url })
}