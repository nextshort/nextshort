import { useRouter } from 'next/router';
import React, { useState,useEffect } from 'react';

export default ()=>{
    const [url,setUrl]=useState(null);
    const [msg,setMsg]=useState('');
    
    const router = useRouter();
    const { slug } = router.query;
    console.log('slug',slug);

    const getUrl = async()=>{
        const res = await fetch(`/api/${slug}`);
        const json = await res.json();
        if(json.err){
            setMsg(404);
        }else{
            setUrl(json.url);
            window.location.href=json.url;
        }
    }
    useEffect(()=>{
        getUrl();
    },[])
    
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
        {
            url!=null?<>
            正在跳转到 {url} ，请稍后。。。
            </>:<>{msg}</>
        }
        </div>
        </>
    )
}