import { useEffect, useState } from 'react'
import { Todo } from './Todo'
import { Create } from "./Create"
import { Button } from './components/ui/button';
import { useNavigate } from 'react-router-dom';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false)
  const [todo, setTodo] = useState([])
  const [log, setLog] = useState(false)
  const navigate = useNavigate()

  function logout() {
    localStorage.clear('token')
    navigate('/')
    setLog(false)
    setRefresh(p => !p)
  }

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      setLog(true)
    }
  }, [])
  useEffect(() => {
    let token = localStorage.getItem('token')
    let options = { method: "GET" }
    if (token) {
      options.headers = { authorization: "Bearer " + token }
    }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todo`, options)
      .then((res) => res.json())
      .then((res) => setTodo(res.todos))
      .catch(() => { console.log("Server is not up.Try after sometime") })
      .finally(() => setLoading(false))
  }, [refresh])
  return (
    <>
      <div className=''>
        <div className='flex justify-between bg-black items-center px-10'>
          <h1 className='text-center text-2xl p-2 text-gray-50'>SyncTasks</h1>
          <div className='flex gap-5 text-gray-50'>
            {log && <button onClick={logout}>Logout</button>}
            {!log && <><button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('signup')}>Signup</button></>}
          </div>
        </div>
        <div className='lg:px-40'>
          <Create setRefresh={setRefresh} />
          <div className='relative flex flex-col items-end'>
            <Button className='absolute -top-10 border-2 p-2' disabled={loading} onClick={() => { setRefresh((pre) => !pre); setLoading(true) }}>Refresh</Button>
          </div>
          <legend></legend>
          <div class="p-4 my-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span class="font-medium">Note:</span> This is public todo list visible to everyone. You can introduct youself here or Signup to create private todos          </div>
          <div className=''>
            <Todo todos={todo} setRefresh={setRefresh} />
          </div>
        </ div>
      </div>
    </>
  )
}

export default App
