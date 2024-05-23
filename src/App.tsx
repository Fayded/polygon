import { useRef, useState } from 'react'
import Todos from './components/Todos';
import './App.css'

type Todo = {
  id: number
  text: string
  isCompleted: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const counter = useRef(0);
  const [filtered, setFiltered] = useState(false)
  const name = useRef<HTMLInputElement>(null)
  const filteredTodos = todos.filter((todo: Todo) => filtered ? !todo.isCompleted : todo)

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const text = formData.get('todo') as string
    const newTodo: Todo = {
      id: counter.current = counter.current + 1,
      text,
      isCompleted: false
    }
    setTodos([...todos, newTodo])
    name.current!.value = ''
  }

  const handleCompleted = (id: number) => {
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo: Todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleSort = () => {
    const newTodos = [...todos].sort((a: Todo, b: Todo) => a.text.localeCompare(b.text))
    setTodos(newTodos)
  }

 const handleFilterCompleted = () => {
    setFiltered((prev) => !prev)
  }

  return (  
    <div className="App" style={{width: '400px'}}>
      <form onSubmit={handleSubmit} className="flex items-center justify-between w-full">
        <input type="text" name="todo" ref={name} placeholder="Enter a new todo" className="p-4 py-4 mr-4 flex-1" />
        <button type="submit" className="block p-4">Add</button>
      </form>
      <div className="flex justify-between">
        <button onClick={handleFilterCompleted} className="flex items-end mt-2 w-100">
          { filtered ? 'Show All Tasks' : 'Filter Completed Tasks' }
        </button>
        <button onClick={handleSort} className="flex items-end mt-2 w-100">Sort Alphabetically</button>
      </div>
      <ul className="mt-4">
        <Todos todos={filteredTodos} handleCompleted={handleCompleted} handleDelete={handleDelete} />
      </ul>
    </div>
  )
}

export default App