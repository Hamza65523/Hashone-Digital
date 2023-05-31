import { useState } from "react"
import folder from "./assets/folder.svg"
import arrow from "./assets/arrow.svg"
import "./App.css"
import TodoList from "./TodoList"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="">
        {/* <div className="flex gap-2 items-center">
          <img src={folder} alt="" />
          <h1 className="font-bold font-mono">Productivity</h1>
          <div className="h-[1px] w-44 bg-gray-500"></div>
          <img src={arrow} alt="" />
        </div>
        <div className="flex gap-2">
        <input type="checkbox" />
          <p>Work on the landing page</p>
        </div>
        <div className="flex gap-2">
        <input type="checkbox" />
          <p>Work on the landing page</p>
        </div> */}
        <TodoList/>
      </div>
    </>
  )
}

export default App
