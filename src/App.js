import "./styles/main.scss";
import "./App.css";
import Navbar from "./components/navbar";
import Projects from "./components/projects";
import Namecontainer from "./components/name-container";
import Technologies from "./components/technologies";
function App() {
  return (
    <div>
      <Navbar />
      <Namecontainer />
      <Technologies />
      <Projects />
    </div>
  );
}
export default App;
