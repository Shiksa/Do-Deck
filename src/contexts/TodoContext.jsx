import { createContext, useContext, useEffect, useState } from "react";

export const TodoContext = createContext(
  //   {
  //   todos: [
  //     {
  //       id: 1,
  //       todo: "ToDo Task",
  //       completed: false,
  //     }
  //   ],
  //   addTodo: (todo) => { },
  //   updateTodo: (id, todo) => { },
  //   deleteTodo: (id) => { },
  //   toggleComplete: (id) => { }
  // }
);

//custom hook
export const useTodoContext = () => {
  return useContext(TodoContext);
}

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    // {
    //   todos: [
    //     {
    //       id: 1,
    //       todo: "ToDo Task",
    //       completed: false,
    //     }
    //   ],
    // }
  ])

  const addTodo = (todo) => {
    setTodos((prev) =>
      [...prev, {
        id: Date.now(),
        task: todo.task || "",
        date: todo.date || "",
        time: todo.time || "",
        completed: false,
      }
      ])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map(
      (prevTodo) => (prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo)
    ))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter(
      (prevTodo) => prevTodo.id !== id
    ))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map(
      (prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)
    ))
  }

  const groupTodosByDate = () => {
    const groups = {};
    todos.forEach((todo) => {
      const date = todo.date || "No Date";
      if (!groups[date]) groups[date] = [];
      groups[date].push(todo);
    });
    const sortedDates = Object.keys(groups).sort((a, b) => {
      if (a === "No Date") return 1;
      if (b === "No Date") return -1;
      return new Date(a) - new Date(b);
    });
    return { sortedDates, groups };
  };


  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"))
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete, groupTodosByDate }}>
      {children}
    </TodoContext.Provider>
  )
};