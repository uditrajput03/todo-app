export function Todo({todos ,setRefresh }) {
  function markAsDone(id){
    fetch('https://congenial-zebra-764qr55vwpf455-3000.app.github.dev/completed' , {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: id})
    })
    .then(() => setRefresh((pre) => !pre))
  }
  return (
    <>
      {todos.map((todo) => {
        return (<div  className='border-2 flex flex-col' key={"title"}>
        <h1 className='text-3xl'>{todo["title"]}</h1>
        <h1>{todo.description}</h1>
        <button onClick={() => {markAsDone(todo._id)}} className='border-2 ml-auto' id={todo?._id}>{ todo.completed ? "Completed" : "Mark as done"}</button>
        </div>)
      })}
    </>
  )
}
