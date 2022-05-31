import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <nav>
        <Link to="/home">Home</Link> | <Link to="/">Login</Link>
      </nav>
      <h1>Home page</h1>
    </div>
  );
}

export default Home;
