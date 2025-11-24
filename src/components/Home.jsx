import React from 'react'
import TodoForm from './TodoForm'
import TodoItems from './TodoItems'
import { useTodoContext } from '../contexts';
import logo from "../assets/logo.png"

const Home = () => {
  const { todos, groupTodosByDate } = useTodoContext();
  const { sortedDates, groups } = groupTodosByDate();

  const formatDate = (dateStr) => {
    if (dateStr === "No Date") return "No Date Assigned";

    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    const suffix =
      day === 1 ? "st" :
        day === 2 ? "nd" :
          day === 3 ? "rd" : "th";

    return `${day}${suffix} ${month}, ${year}`;
  };

  return (
    <div className="bg-[#172842] min-h-screen w-full md:py-8">
      <div className=" w-full max-w-2xl mx-auto shadow-2xl bg-white/10 
      backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white">
        <div className="flex justify-between items-center mb-8 mt-2">
          <div className=''></div>
          <img src={logo} alt="" className='w-30 h-auto invert' />
          <h1 className="text-lg md:text-3xl font-bold mx-auto">Manage Your Todos</h1>
        </div>
        <div className="mb-4">
          {/* Todo form goes here */}
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {!todos.length &&
            <div className='text-4xl text-center mx-auto py-31 brightness-70 '>
              I'm Empty <br />Plan Your day <br /> With Me
            </div>}
          {sortedDates.map((date) => (
            <div key={date} className='w-full'>
              <h2>📅 {formatDate(date)}</h2>
              {groups[date].map(todo => (
                <TodoItems key={todo.id} todo={todo} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
