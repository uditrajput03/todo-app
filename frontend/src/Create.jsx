import { useEffect, useRef, useState } from 'react'
export function Create({ setRefresh }){
    let title = useRef(null)
    let des = useRef(null)
    function create(title , description){
        fetch('https://congenial-zebra-764qr55vwpf455-3000.app.github.dev/todo' , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({title: title , description: description})
        })
        .then(()=> setRefresh((pre) => !pre))
    }
    return (
    <>
    Title: <input className='border-2 mx-2' type="text" ref={title}/>
    Description: <input className='border-2 mx-2' type="text" ref={des}/>
    <button onClick={() => {title.current.value && des.current.value? create(title.current.value , des.current.value) : alert("Invalid input"); title.current.value = "" ; des.current.value = "";}}  className='border-2'>Create</button>
    <br />
    </>
    )
}