var Datastore = require('nedb');
const currentPath = process.cwd();
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

export default (req, res) => {
    const {
        body: { url },
    } = req
    
    let db = new Datastore({ filename: `${currentPath}/db`, autoload: true });

    res.statusCode = 200;

    db.findOne({ _id: 'ai' }, function (err, doc) {
        console.log('_id',doc);
        if(doc==null){
            db.insert({_id:'ai',value:10000000}, function (err, newDoc) {
                db.insert({type:'url',slug:string10to62(10000000),url:url,time:Date.now()}, function (err, newDoc) {
                    res.json(newDoc);
                });
            });
        }else{
            db.update({ _id: 'ai' }, { $set: { value: doc.value+1 } }, {}, function () {
            });
            db.insert({type:'url',slug:string10to62(doc.value+1),url:url,time:Date.now()}, function (err, newDoc) {
                res.json(newDoc);
            });
        }
    });
}