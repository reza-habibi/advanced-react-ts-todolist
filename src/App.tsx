import { useState } from "react";
import Header from "./components/header/header";
import BasicTable from "./components/Table/Table";
import "./App.css";
import { TFilters, TTask } from "./Types";


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
  const [filters, setFilters] = useState<TFilters>({
    priority: 0,
    status: 0,
    deadline: 0,
  });

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
          setEditMode={setEditMode}
          setFilters={setFilters}
          filters={filters} />
        
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
          setEditMode={setEditMode}
          setFilters={setFilters}
          filters={filters}/>
          
      </div>
    </div>
  );
}

export default App;
