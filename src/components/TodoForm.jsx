import React, { useState } from 'react'
import { useTodoContext } from '../contexts'

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("")

  const dateRef = React.useRef(null);
  const timeRef = React.useRef(null);


  const { addTodo } = useTodoContext()

  const add = (e) => {
    e.preventDefault()
    if (!task.trim()) return
    addTodo({ task, date, time, completed: false })
    setTask("")
    setDate("")
    setTime("")
  }

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={task} //this is called wiring
        onChange={(e) => setTask(e.target.value)}
      />


      <input type="date"
        ref={dateRef}
        className='hidden md:block border border-black/10 rounded-lg px-2 bg-white/20 text-white'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {/* DATE ICON (Mobile only) */}
      <button
        type="button"
        className="md:hidden border border-black/10 rounded-lg px-3 bg-white/20 text-white"
        onClick={() => dateRef.current?.showPicker()}
      >
        📅
      </button>


      <input type="time"
        ref={timeRef}
        className='hidden md:block border border-black/10 rounded-lg px-2 bg-white/20 text-white'
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      {/* TIME ICON (Mobile only) */}
      <button
        type="button"
        className="md:hidden border border-black/10 rounded-lg px-3 bg-white/20 text-white"
        onClick={() => timeRef.current?.showPicker()}
      >
        ⏰
      </button>



      <button type="submit" className="rounded-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  )
}

export default TodoForm