import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}

export default App;
