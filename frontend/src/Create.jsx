import { useRef } from 'react'
import { Button } from './components/ui/button'
import { FloatingInput, FloatingLabel, FloatingLabelInput } from './components/ui/floating-label-input'
import { toast } from 'sonner'
export function Create({ setRefresh }) {
    let title = useRef(null)
    let des = useRef(null)
    let token = localStorage.getItem('token')
    let headers = {
        "Content-Type": "application/json",
    }
    if (token) headers["authorization"] = "Bearer " + localStorage.getItem('token')
    function create(title, description) {
        const res = fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todo`, {
            method: "POST",
            headers,
            body: JSON.stringify({ title: title, description: description })
        })
        .then(() => {
            // toast.success("Todo has been created")
            setRefresh((pre) => !pre)
        })
        toast.promise(res, {
            loading: 'Creating...',
            success: () => {
                return `Todo has been created`;
            },
            error: 'Error'
            });
    }
    return (
        <>
            <div className='flex flex-col  justify-center border-2 '>
                <div className='mt-10 relative mx-auto'>
                    <FloatingInput id="floating-customize" className='bg-white mx-2' type="text" ref={title} />
                    <FloatingLabel htmlFor="floating-customize">Title</FloatingLabel>
                </div>
                {/* <div className='mx-auto p-2'><FloatingLabelInput className='bg-white border-2 mx-2' type="text" ref={title} label="Title" /></div> */}
                <div className='relative mx-auto mt-4'>
                    <FloatingInput id="floating-customize1" className='bg-white mx-2' type="text" ref={des} />
                    <FloatingLabel htmlFor="floating-customize1">Description</FloatingLabel>
                    {/* <FloatingLabelInput className='bg-white border-2 mx-2' type="text" ref={des} label="Description" /> */}
                </div>
                <br />
                <Button className='mx-auto' onClick={() => { title.current.value && des.current.value ? create(title.current.value, des.current.value) : toast.warning("Input required"); title.current.value = ""; des.current.value = ""; }} >Create</Button>
                <br />
            </div>
        </>
    )
}