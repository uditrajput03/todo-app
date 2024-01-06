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
    <div className='flex flex-col justify-center border-2 '>
    <div className='mx-auto p-2'> Title: <input className='border-2 mx-2 ' type="text" ref={title}/></div>
    <div className='mx-auto p-2'>Description: <input className='border-2 mx-2' type="text" ref={des}/></div>
            <br />
    <button className='border-2 p-2 bg-gray-200 mx-auto px-4 rounded-xl' onClick={() => {title.current.value && des.current.value? create(title.current.value , des.current.value) : alert("Invalid input"); title.current.value = "" ; des.current.value = "";}} >Create</button>
    <br />
    </div>
    </>
    )
}