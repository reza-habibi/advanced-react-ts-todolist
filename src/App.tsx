import { useState } from "react";
import Header from "./components/header/header";
import BasicTable from "./components/Table/Table";
import  tasks  from "./Data/tasks";
import "./App.css";
import { TTask } from "./Types";

function App() {
  const [myTask, setMyTask] = useState<TTask[]>(tasks);

  return (
    <div className="w-100 h-100 d-flex flex-column ">
      <div className="header">
        <Header myTask={myTask} setMyTask={setMyTask}/>
        <BasicTable myTask={myTask} setMyTask={setMyTask}/>
      </div>
    </div>
  );
}

export default App;
