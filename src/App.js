import "./App.css";
import "./styles/main.scss";
import Navbar from "./components/navbar";
import Projects from "./components/projects";
import Namecontainer from "./components/name-container";

function App() {
  return (
    <div>
      <Navbar />
      <Namecontainer />
      <Projects />
    </div>
  );
}
export default App;
