import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [showfinished, setshowfinished] = useState(false)
  const [removefinished, setremovefinished] = useState(false)
  

  useEffect(() => {
    const todostring = localStorage.getItem("todos");
    if (todostring) {
      const savedTodos = JSON.parse(todostring);
      setTodos(savedTodos);
    }
    setIsFirstLoad(false);
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleSave = () => {
    setTodos([...todos, { id: Date.now(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleCheckbox = (e) => {
    let id = Number(e.target.name)
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
  }

  const handleEdit = (e, id) => {
    let temp = todos.filter(item => { return item.id === id })
    setTodo(temp[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)
  }

  const handleShowfinished = () => {
    setshowfinished(!showfinished)
  }

  const handleRemoveFinished = (e) => {
    const ischeked = e.target.checked
    setremovefinished(ischeked)
    if (ischeked) {
      let newtodos = todos.filter(item=>{
        return !item.isCompleted
      })
      setTodos(newtodos)
    }
  }

  useEffect(() => {
    if (!isFirstLoad) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isFirstLoad]);


  return (
    <>
      <Navbar />
      {/* <!-- Main Content Section (to be placed below navbar) --> */}
      <div className="container mx-auto px-4 py-8 max-w-3xl bg-purple-100 h-screen">
        {/* <!-- App Title --> */}
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">TaskFlow - Manage your todos at one place</h1>

        {/* <!-- Add Todo Section --> */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Add a Todo</h2>
          <div className="flex gap-2">
            <input type="text" onChange={handleChange} value={todo} placeholder="Enter your task..." className="flex-grow px-4 py-3 rounded-full border-2 border-gray-200 focus:outline-none focus:border-purple-500" />
            <button onClick={handleSave} disabled={todo.length < 1} className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-2 rounded-full transition duration-200 hover:cursor-pointer">
              Save
            </button>
          </div>
        </div>

        {/* <!-- Show Finished Checkbox --> */}
        <div className="mb-4 flex items-center">
          <input type="checkbox" onChange={handleShowfinished} checked={showfinished} id="show-finished" className="h-4 w-4 text-purple-600 hover:cursor-pointer focus:ring-purple-500 border-gray-300 rounded" />
          <label for="show-finished" className="ml-2 text-gray-700">Show Finished</label>
          <input type="checkbox" onChange={handleRemoveFinished}  id="show-finished" className="h-4 w-4 ml-4 text-purple-600 hover:cursor-pointer focus:ring-purple-500 border-gray-300 rounded" />
          <label for="show-finished" className="ml-2 text-gray-700">Remove Finished</label>
        </div>

        {/* <!-- Divider --> */}
        <hr className="my-6 border-gray-300" />

        {/* <!-- Todo List Section --> */}
        <div >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Todos</h2>
          {todos.length === 0 && <div>No todos to display</div>}
          {/* <!-- Todo Item --> */}
          {(showfinished ? todos.filter(todo => todo.isCompleted) : todos).map((item) => {
            return <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 mb-3 flex justify-between items-center">
              <div className="flex items-center">
                <input onClick={handleCheckbox} checked={item.isCompleted} name={item.id} type="checkbox" className="h-5 w-5 text-purple-600 hover:cursor-pointer focus:ring-purple-500 border-gray-300 rounded mr-3" />
                <span className={item.isCompleted ? "line-through text-gray-800" : "text-gray-800"}>{item.todo}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={(e) => { handleEdit(e, item.id) }} className="text-purple-600 hover:cursor-pointer hover:text-purple-800 p-1">
                  Edit
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="text-purple-600 hover:cursor-pointer hover:text-purple-800 p-1">
                  Delete
                </button>
              </div>
            </div>
          })}
          {/* <!-- Additional todos would be added here --> */}
        </div>
      </div>
    </>
  )
}

export default App
