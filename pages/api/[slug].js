const currentPath = process.cwd();
var Datastore = require('nedb');
let db = new Datastore({ filename: `${currentPath}/db`, autoload: true });
export default (req, res) => {
    const {
      query: { slug },
    } = req
    
    db.findOne({ slug: slug }, function (err, doc) {
        if(doc!=null){
            res.json({url:doc.url})
        }else{
            res.json({err:true});
        }
    });
}