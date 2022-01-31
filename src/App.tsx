import { useState } from "react";
import Header from "./components/header/header";
import BasicTable from "./components/Table/Table";
import "./App.css";
import { TFilters } from "./type";


const App=()=> {

  const [filter, setFilter] = useState('')
  const [open, setOpen] = useState(false);
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
        <Header 
          filter={filter} 
          setFilter={setFilter} 
          open={open}
          setOpen={setOpen} 
          viewMode={viewMode} 
          setViewMode={setViewMode}
          editMode={editMode}
          setEditMode={setEditMode}
          setFilters={setFilters}
          filters={filters} />
        
        <BasicTable
          filter={filter} 
          setFilter={setFilter} 
          open={open}
          setOpen={setOpen} 
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
