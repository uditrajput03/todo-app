export function Todo({todos ,setRefresh }) {
  function markAsDone(id , route){
    fetch(`https://congenial-zebra-764qr55vwpf455-3000.app.github.dev/${route}` , {
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
        let completed = todo?.completed;
        return (<div  className={`border-2 flex flex-col ${completed? "bg-green-50" : "bg-yellow-50"}`} key={"title"}>
        <h1 className='text-3xl'>{todo["title"]}</h1>
        <h1>{todo.description}</h1>
        <button onClick={() => {markAsDone(todo._id , "completed")}} className={`${completed ? "bg-green-300" : "bg-yellow-300"} border-2 ml-auto`} id={todo?._id}>{ completed ? "Completed" : "Mark as done"}</button>
        <button onClick={() => {markAsDone(todo._id , "remove")}} className='border-2 ml-auto bg-red-400'>Remove</button>
        </div>)
      })}
    </>
  )
}