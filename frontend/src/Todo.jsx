import { Button } from "@/components/ui/button"
export function Todo({ todos, setRefresh }) {
  function markAsDone(id, method = "PUT") {
    let token = localStorage.getItem('token')
    let headers = {}
    if (token) headers["authorization"] = "Bearer " + localStorage.getItem('token')
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/todo/${id}`, {
      method, headers
    })
      .then(() => setRefresh((pre) => !pre))
  }
  return (
    <>
      {todos.map((todo) => {
        let completed = todo?.completed;
        return (<div className={`border-2 pl-5 pt-2 flex flex-col ${completed ? "bg-green-50" : "bg-yellow-50"}`} key={todo["_id"]}>
          <h1 className='text-xl'>{todo["title"]}</h1>
          <h2>{todo.description}</h2>
          <Button onClick={() => { markAsDone(todo._id, "PUT") }} className={`${completed ? "bg-green-400" : "bg-yellow-400"} border-2 ml-auto`} id={todo?._id}>{completed ? "Completed" : "Mark as done"}</Button>
          <Button onClick={() => { markAsDone(todo._id, "DELETE") }} className='border-2 ml-auto' variant="destructive">Remove</Button>
        </div>)
      })}
    </>
  )
}
