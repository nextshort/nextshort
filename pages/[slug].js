import { useRouter } from 'next/router';
import React, { useState } from 'react';
var Datastore = require('nedb');
export default ()=>{
    const [url,setUrl]=useState(null);
    const [msg,setMsg]=useState('');
    let db = new Datastore({ filename: './db', autoload: true });
    const router = useRouter()
    const { slug } = router.query
    db.findOne({ slug: slug }, function (err, doc) {
        //callback
        console.log(doc);
        if(doc!=null){
            setUrl(doc.url);
            window.location.href=doc.url;
        }else{
            setMsg('404');
        }
    });
    return(
        <>
        <div className="box">
        <style jsx="true">
            {
                `
                .box{
                    display: flex;
                    width: 100%;
                    height: 100%;
                    position: fixed;
                    align-items: center;
                    justify-content: center;
                }
                `
            }
        </style>
            {(()=>{
                if(url){
                    return(
                        <>正在跳转到 {url} ，请稍后。。。</>
                    )
                }else{
                    return(
                        <>{msg}</>
                    )
                }
            })()}
        </div>
        </>
    )
}