import { useEffect, useState } from 'react'
import { Todo } from './Todo'
import { Create } from "./Create"
import { Button } from './components/ui/button';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false)
  const [todo, setTodo] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/todos`)
      .then((res) => res.json())
      .then((res) => setTodo(res.todo))
      .catch(() => { alert("Server is not up.Try after sometime") })
      .finally(() => setLoading(false))
  }, [refresh])
  return (
    <>
      <div className=''>
        <h1 className='text-center text-2xl p-2 bg-black text-white'>SyncTasks</h1>
        <div className='lg:px-40'>
          <Create setRefresh={setRefresh} />
          <div className='relative flex flex-col items-end'>
            <Button className='absolute -top-10 border-2 p-2' disabled={loading} onClick={() => {setRefresh((pre) => !pre); setLoading(true)}}>Refresh</Button>
          </div>
          <legend></legend>
          <div className=''>
            <Todo todos={todo} setRefresh={setRefresh} />
          </div>
        </ div>
      </div>
    </>
  )
}

export default App
