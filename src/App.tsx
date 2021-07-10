import { useState } from "react";
import Header from "./components/header/header";
import BasicTable from "./components/Table/Table";
import "./App.css";
import { TTask } from "./Types";


const App=()=> {

  const [myTask, setMyTask] = useState<TTask[]>([]);
  const [filter, setFilter] = useState('')
  const [open, setOpen] = useState(false);
  const [value,setValue]=useState<TTask>({
    id: 0,
    task: "",
    priority: 0,
    status: 0,
    deadline: 0,
    message: "",
    unix:0
  })
  const [viewMode,setViewMode]=useState(false);
  const [editMode,setEditMode]=useState(false);


  return (
    <div className="w-100 h-100 d-flex flex-column ">
      <div className="header">
        <Header myTask={myTask} 
          setMyTask={setMyTask} 
          filter={filter} 
          setFilter={setFilter} 
          open={open}
          setOpen={setOpen} 
          value={value} 
          setValue={setValue}
          viewMode={viewMode} 
          setViewMode={setViewMode}
          editMode={editMode}
          setEditMode={setEditMode}/>
        
        <BasicTable myTask={myTask} 
          setMyTask={setMyTask} 
          filter={filter} 
          setFilter={setFilter} 
          open={open}
          setOpen={setOpen} 
          value={value} 
          setValue={setValue}
          viewMode={viewMode} 
          setViewMode={setViewMode}
          editMode={editMode}
          setEditMode={setEditMode}/>
      </div>
    </div>
  );
}

export default App;
