import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Signup() {

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const {username: email , password} = data
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
            <div className="flex justify-center ">
                <Form className="flex flex-col justify-center w-screen h-screen"
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    onFinish={onSubmit}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button className="flex justify-center" color="default" variant="solid" block htmlType="submit">
                            Sign Up
                        </Button>
                        <a href="/login">Already have an account?</a>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}