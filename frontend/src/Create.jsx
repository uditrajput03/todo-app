import { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from './components/ui/button'
export function Create({ setRefresh }) {
    let title = useRef(null)
    let des = useRef(null)
    function create(title, description) {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title: title, description: description })
        })
            .then(() => setRefresh((pre) => !pre))
    }
    return (
        <>
            <div className='flex flex-col  justify-center border-2 '>
                <div className='mx-auto p-2'><Input className='bg-white border-2 mx-2 ' type="text" ref={title} placeholder="Title"/></div>
                <div className='mx-auto p-2'><Input className='bg-white border-2 mx-2' type="text" ref={des} placeholder="Descritption"/></div>
                <br />
                <Button className='mx-auto' onClick={() => { title.current.value && des.current.value ? create(title.current.value, des.current.value) : alert("Invalid input"); title.current.value = ""; des.current.value = ""; }} >Create</Button>
                <br />
            </div>
        </>
    )
}