import React, { useState } from 'react'
import { useTodoContext } from '../contexts';

const TodoItems = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.task)
  const [todoDate, setTodoDate] = useState(todo.date)
  const [todoTime, setTodoTime] = useState(todo.time)

  const { updateTodo, deleteTodo, toggleComplete } = useTodoContext()

  const editTodo = () => {
    updateTodo(todo.id, {
      task: todoMsg,
      date: todoDate,
      time: todoTime
    })
    setIsTodoEditable(false)
  }

  return (
    <div
      className={`flex items-center gap-3
      border border-black/10 rounded-lg px-3 py-2 shadow-sm duration-300
      text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}
    >

      {/* Checkbox */}
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      {/* Task Input */}
      <input
        type="text"
        className={` text-md md:text-lg font-bold capitalize flex-1 min-w-0 border outline-none bg-transparent rounded-lg
        ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"}
        ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Date */}
      <input
        type="date"
        className="w-[135px] hidden md:block font-medium  rounded px-2 "
        value={todoDate}
        onChange={(e) => setTodoDate(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Time */}
      <input
        type="time"
        className=" bg-transparent  text-black font-medium focus:outline-none "
        value={todoTime}
        onChange={(e) => setTodoTime(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit / Save Button */}
      <button
        className="w-9 h-9 rounded-lg text-sm border border-black/10 flex justify-center items-center bg-gray-50 hover:bg-gray-100"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) editTodo();
          else setIsTodoEditable(true);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      {/* Delete */}
      <button
        className="w-9 h-9 rounded-lg text-sm border border-black/10 flex justify-center items-center bg-gray-50 hover:bg-gray-100"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>

    </div>
  )
}

export default TodoItems;
