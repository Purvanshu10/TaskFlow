import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleSave = () => {
    setTodos([...todos, { id: Date.now(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos);
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
  const handleEdit = () => { }
  const handleDelete = () => { }

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
            <button onClick={handleSave} className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-2 rounded-full transition duration-200">
              Save
            </button>
          </div>
        </div>

        {/* <!-- Show Finished Checkbox --> */}
        <div className="mb-4 flex items-center">
          <input type="checkbox" id="show-finished" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
          <label for="show-finished" className="ml-2 text-gray-700">Show Finished</label>
        </div>

        {/* <!-- Divider --> */}
        <hr className="my-6 border-gray-300" />

        {/* <!-- Todo List Section --> */}
        <div >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Todos</h2>
          {/* <!-- Todo Item --> */}
          {todos.map((item) => {
            return <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 mb-3 flex justify-between items-center">
              <div className="flex items-center">
                <input onClick={handleCheckbox} name={item.id} type="checkbox" className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mr-3" />
                <span className={item.isCompleted?"line-through text-gray-800":"text-gray-800"}>{item.todo}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={handleEdit} className="text-purple-600 hover:text-purple-800 p-1">
                  Edit
                </button>
                <button onClick={handleDelete} className="text-purple-600 hover:text-purple-800 p-1">
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
