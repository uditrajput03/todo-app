import { useEffect, useState } from 'react'
import { Todo } from './Todo'
import { Create } from "./Create"
function App() {
  const [refresh, setRefresh] = useState(false);
  const [todo, setTodo] = useState([])
  useEffect(() => { 
    fetch('https://congenial-zebra-764qr55vwpf455-3000.app.github.dev/todos')
    .then((res) => res.json())
    .then((res) => setTodo(res.todo))
    .catch(() => {alert("Server is not up.Try after sometime")})
  },[refresh])
  return (
    <>
      <h1 className='text-center text-3xl p-3'>ToDo-App</h1>
      <Create setRefresh = {setRefresh}/>
      <div className='flex flex-col items-end'><button className='border-2 p-2' onClick={() => setRefresh((pre) => !pre)}>Refresh</button></div>
      <Todo todos={todo} setRefresh = {setRefresh}/>
    </>
  )
}

export default App
