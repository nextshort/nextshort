import { Button,InputGroup,FormControl,Alert,Jumbotron } from 'react-bootstrap';
import React, { useState } from 'react';

function isValidUrl(url) {
    console.log('check',url);
    try {
      new URL(url);
    } catch (_) {
      return false;  
    }
    return true;
}

export default () => {
    const [url,setUrl]=useState('');
    const [msg,setMsg]=useState('');
    const [variant,setVariant]=useState('');

    const change=e=>{
        console.log('change')
        setUrl(e.target.value);
    }
    const show=doc=>{
        setMsg(`${window.location.href}${doc.slug}`);
        setVariant('success');
        setUrl('');
    }
    const post=async()=>{

        if(isValidUrl(url)){
            const res = await fetch('/api/post',{
                method:"POST",
                //mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    'url' : url
                })
            });
            const json = await res.json();
            show(json);
        }else{
            setMsg('url不正确');
            setVariant('danger');
        }
    }
    return(
        <div className="flex-center">
            <a href="https://github.com/codetyphon/nextshort" target="_blank" className="github-corner" aria-label="View source on GitHub">
                <svg width="80" height="80" viewBox="0 0 250 250" 
                    style={
                        {
                            fill:"#FD6C6C",
                            color:"#fff",
                            position:"absolute",
                            top: 0,
                            border: 0,
                            right: 0
                        }
                    } 
                    aria-hidden="true">
                    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z">
                    </path>
                    <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin:"130px 106px"}} className="octo-arm"></path>
                    <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
                </svg>
            </a>
            <style jsx="true">
                {
                    `
                    html,
                    body {
                        background-color: #fff;
                        color: #636b6f;
                        font-family: 'Nunito', sans-serif;
                        font-weight: 200;
                        height: 100vh;
                        margin: 0;
                    }

                    .full-height {
                        height: 100vh;
                    }

                    .flex-center {
                        align-items: center;
                        display: flex;
                        justify-content: center;
                        position: fixed;
                        width: 100%;
                        height: 100%;
                    }

                    .position-ref {
                        position: relative;
                    }

                    .top-right {
                        position: absolute;
                        right: 10px;
                        top: 18px;
                    }

                    .content {
                        text-align: center;
                    }
                    .title {

                    }
            
                    .links>a {
                        color: #636b6f;
                        padding: 0 25px;
                        font-size: 13px;
                        letter-spacing: .1rem;
                        text-decoration: none;
                        text-transform: uppercase;
                    }
            
                    .m-b-md {
                        margin-bottom: 30px;
                    }
            
                    .content {
                        width: 96%;
                        max-width: 1000px;
                    }
                    .github-corner:hover .octo-arm{
                        animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
                    `
                }
            </style>
            <div className="content">
                <div className="title m-b-md">
                    <Jumbotron>
                    <h1>nextShort</h1>
                    <p>使用next.js构建的网址缩短系统</p>
                    <Alert variant={variant}>
                        {msg}
                    </Alert>
                    <InputGroup>
                        <FormControl
                        placeholder="http://"
                        aria-label="URL"
                        value={url}
                        onChange={change}
                        size="lg"
                        />
                        <InputGroup.Append>
                            <Button variant="primary" size="lg" onClick={post} >生成短链</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Jumbotron>
                </div>
            </div>
        </div>
    )
}