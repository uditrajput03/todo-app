import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const submit = async () => {
        let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "content-type": "application/json"
            }
        })
        res = await res.json()
        if(res.token){
            localStorage.setItem('token', res.token)
            navigate('/')   
        }
        else{
            console.log("Something went wrong");
        }
    }

    return(
    <>
    <div>
        <div>Email</div>
        <input onChange={(e) => setEmail(e.target.value)} type="email" />
        <div>Password</div>
        <input onChange={(e) => setPassword(e.target.value)} type="password" />
        <button onClick={submit}>Signup</button>
    </div>


    </>
    )
}