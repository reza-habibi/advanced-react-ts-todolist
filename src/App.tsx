import Header from "./components/header/header";
import BasicTable from "./components/Table/Table";
import "./App.css";

function App() {

  return (
    <div className="w-100 h-100 d-flex flex-column ">
      <div className="header">
        <Header />
        <BasicTable />
      </div>
    </div>
  );
}

export default App;
